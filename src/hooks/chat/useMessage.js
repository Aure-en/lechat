import { useState, useEffect, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import socket from "../../socket/socket";
import { useUnread } from "../../context/UnreadContext";
import { useAuth } from "../../context/AuthContext";

/**
 * Fetch the messages from a certain conversation / server channel.
 * Regroup those who were written in a row by the same author.
 * Update them in real time with socket listeners.
 * @param {object} location. Either :
 * - { conversation: {string} id }
 * - { channel: {string} id }
 */

function useMessage(location) {
  const LIMIT = 50;
  const getKey = (index, prev) => {
    if (index !== 0 && !prev[prev.length - 1]?._id) return; // There are no messages left.

    let endpoint = `${process.env.REACT_APP_SERVER}`;
    if (location.conversation) {
      endpoint += `/conversations/${location.conversation}/messages?limit=${LIMIT}`;

      // If there already are loaded messages, fetch the previous ones.
      if (prev && prev[prev.length - 1]?._id) {
        endpoint += `&last_key=${prev[prev.length - 1]._id}`;
      }
    }

    if (location.channel) {
      endpoint += `/channels/${location.channel}/messages?limit=${LIMIT}`;

      // If there already are loaded messages, fetch the previous ones.
      if (prev && prev[prev.length - 1]?._id) {
        endpoint += `&last_key=${prev[prev.length - 1]._id}`;
      }
    }
    return [endpoint, sessionStorage.getItem("jwt")];
  };

  const { data: messages, mutate, size, setSize } = useSWRInfinite(getKey);
  const [ordered, setOrdered] = useState([]);

  // Socket event handlers will be different if the message author is the current user.
  // (So that messages written by a user display instantly for them)
  const { user } = useAuth();
  // Get the number of unread to separate older from newer messages.
  const { getRoomUnread } = useUnread();

  // Helper function to compare dates
  const compareDates = (timestamp1, timestamp2) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    if (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
      return true;
    return false;
  };

  // Regroup messages written by the same author in a row.
  useEffect(() => {
    const ordered = [];

    if (!messages || messages.length === 0) {
      return setOrdered([]);
    }

    let unordered = [...messages]
      .flat()
      .sort((a, b) => a.timestamp - b.timestamp);

    // Get unread messages
    const unread = getRoomUnread(location);

    // Give a property unread: true to the oldest unread message.
    unordered = unordered.map((message, index) => {
      if (index === unordered.length - unread) {
        // Copy message and add the unread property.
        const withProperty = JSON.parse(JSON.stringify(message));
        withProperty.unread = true;
        return withProperty;
      }
      return message;
    });

    unordered.map((message, index) => {
      // Create the first group from the first message
      if (index === 0) {
        ordered.push({
          author: message.author,
          timestamp: message.timestamp,
          messages: [message],
          _id: message._id,
        });
        return;
      }

      /*
        Loop over messages.
        - If the message has the same author and same date as the previous one,
          push it in the same group.
        - Else, create a new group of messages.
      */
      if (
        message.author._id === ordered[ordered.length - 1].author._id &&
        compareDates(message.timestamp, ordered[ordered.length - 1].timestamp)
      ) {
        ordered[ordered.length - 1].messages.push(message);
      } else {
        ordered.push({
          author: message.author,
          timestamp: message.timestamp,
          messages: [message],
          _id: message._id,
        });
      }
    });

    setOrdered(ordered);
  }, [messages]);

  /** Load more messages by modifying the last id */
  const getPrevious = useCallback(async () => {
    if (messages?.length > 0) {
      // Tells useMessage the key of the latest message we loaded
      // useMessage will then fetch messages with a key < the latest key.
      // and add them to the messages array.
      setSize(size + 1);
    }
  }, [messages]);

  // Set up socket listeners

  /**
   * When a new message is written:
   * - On the author's screen, replace the placeholder message by the BDD message.
   * - On everyone else's screen, add the message to the messages list.
   */
  function handleInsert(change) {
    const message = change.document;

    if (
      // Checks the location to know if the current room is related to the change.
      // If it is, add the message.
      (location.conversation &&
        message.conversation === location.conversation) ||
      (location.channel && message.channel === location.channel)
    ) {
      mutate(async (prev) => {
        if (
          /* If the message is not displayed yet, adds it.
           * It is the case if:
           * - The current user is not the author or
           * - The current user is the author, but they wrote the message
           *   on another tab. Thus, it was not displayed instantly by
           *   useForm (l.158).
           */
          message.author._id !== user._id ||
          !prev.some((group) =>
            group.some(
              (old) =>
                old.tempId === message.timestamp &&
                old.author._id === message.author._id
            )
          )
        ) {
          /* If the message author is not the current user,
           * the message has no placeholder, so it is added to the list.
           */

          const updated = [...prev];
          updated[updated.length - 1].push(message);
          updated[updated.length - 1] = Array.from(
            new Set(
              [...updated[updated.length - 1]].sort(
                (a, b) => a.timestamp - b.timestamp
              )
            )
          );

          return updated;
        }
        /* If the message author is the current user and
         * the message has a placeholder, replace the placeholder.
         */

        const updated = [...prev];

        // Look for the page that contains the placeholder
        const pageIndex = updated.findIndex((page) =>
          page.some(
            (old) =>
              old.tempId === message.timestamp &&
              old.author._id === message.author._id
          )
        );

        updated[pageIndex] = Array.from(
          new Set(
            [...updated[pageIndex]]
              .map((old) =>
                old.tempId === old.timestamp &&
                old.author._id === message.author._id
                  ? message
                  : old
              )
              .sort((a, b) => a.timestamp - b.timestamp)
          )
        );

        return updated;
      });
    }
  }

  // Replace the message by its updated version when an user updates a message.
  const handleUpdate = (change) => {
    // Page which contains the updated message
    const pageIndex = messages.findIndex((page) =>
      page.find((message) => message._id === change.document._id)
    );

    if (pageIndex !== -1) {
      mutate(async (prev) => {
        const updated = [...prev];
        updated[pageIndex] = updated[pageIndex].map((message) => {
          return message._id.toString() === change.document._id
            ? change.document
            : message;
        });
        return updated;
      });
    }
  };

  // Remove a message when the user deletes a message.
  const handleDelete = (deleted) => {
    // Page which contains the deleted message
    const pageIndex = messages.findIndex((page) =>
      page.find((message) => message._id === deleted.document._id)
    );

    if (pageIndex !== -1) {
      mutate(async (prev) => {
        const updated = [...prev];
        updated[pageIndex] = updated[pageIndex].filter(
          (message) => message._id !== deleted.document._id
        );
      });
    }
  };

  // Update messages' author username / avatar when the user changes it.
  const handleUserUpdate = (user) => {
    const updated = [...messages].map((message) => {
      if (message.author._id === user.document._id) {
        return { ...message, author: user.document };
      }
      return message;
    });
    mutate(updated);
  };

  useEffect(() => {
    socket.on("insert message", handleInsert);
    socket.on("update message", handleUpdate);
    socket.on("delete message", handleDelete);
    socket.on("user update", handleUserUpdate);
    return () => {
      socket.off("insert message", handleInsert);
      socket.off("update message", handleUpdate);
      socket.off("delete message", handleDelete);
      socket.off("user update", handleUserUpdate);
    };
  }, [messages]);

  return {
    setMessages: mutate,
    ordered,
    getPrevious,
  };
}

export default useMessage;
