import { useState, useEffect } from "react";
import socket from "../../socket/socket";
import { useUnread } from "../../context/UnreadContext";

/**
 * Fetch the messages from a certain conversation / server channel.
 * Update them in real time with socket listeners.
 * @param {object} location. Either :
 * - { conversation: {string} id }
 * - { channel: {string} id }
 */
function useMessage(location) {
  // Messages
  const [messages, setMessages] = useState([]);
  const [ordered, setOrdered] = useState([]);
  // Used to load more messages
  const [last, setLast] = useState("");

  // Get the number of unread to separate older from newer messages.
  const { getRoomUnread } = useUnread();

  // Helper function to get the endpoint linked to the room
  const setUrl = (location, lastMessageId) => {
    if (location.conversation) {
      return `${process.env.REACT_APP_SERVER}/conversations/${
        location.conversation
      }/messages${lastMessageId ? `?last_key=${lastMessageId}` : ""}`;
    }

    if (location.channel) {
      return `${process.env.REACT_APP_SERVER}/channels/${
        location.channel
      }/messages${lastMessageId ? `?last_key=${lastMessageId}` : ""}`;
    }
  };

  const getMessages = async (url) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const json = await res.json();
    return json;
  };

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

  // Group messages by author and time so that the author isn't displayed in front of every message.
  useEffect(() => {
    const ordered = [];
    let unordered = [...messages];

    if (messages.length < 1) {
      return setOrdered([]);
    }

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

  // Load messages after entering a room
  useEffect(() => {
    (async () => {
      const url = setUrl(location);
      const messages = await getMessages(url);
      setMessages(messages.sort((a, b) => a.timestamp - b.timestamp));
    })();
  }, [location.conversation, location.server, location.channel]);

  /** Load more messages by modying the last id */
  const getPrevious = async () => {
    if (messages.length > 1 && (!last || messages[0]._id < last)) {
      // Tells useMessage the key of the latest message we loaded
      // useMessage will then fetch messages with a key < the latest key.
      // and add them to the messages array.
      setLast(messages[0]._id);
    }
  };

  useEffect(() => {
    if (!last) return;
    (async () => {
      const url = setUrl(location, last);
      const previous = await getMessages(url);
      setMessages((prev) => [
        ...previous.sort((a, b) => a.timestamp - b.timestamp),
        ...prev,
      ]);
    })();
  }, [last]);

  // Set up socket listeners
  function handleInsert(newMessage) {
    const message = newMessage.document;

    // Checks the location to know if the current room is related to the change.
    // If it is, add the message.
    if (
      (location.conversation &&
        message.conversation === location.conversation) ||
      (location.channel && message.channel === location.channel)
    ) {
      setMessages([...messages, newMessage.document]);
    }
  }

  const handleUpdate = (updated) => {
    setMessages((prev) => {
      const update = [...prev].map((message) => {
        return message._id.toString() === updated.document._id
          ? updated.document
          : message;
      });
      return update;
    });
  };

  const handleDelete = (deleted) => {
    if (
      messages.findIndex((message) => message._id === deleted.document._id) !==
      -1
    ) {
      setMessages((prev) =>
        [...prev].filter((message) => message._id !== deleted.document._id)
      );
    }
  };

  const handleUserUpdate = (user) => {
    const updated = [...messages].map((message) => {
      if (message.author._id === user.document._id) {
        return { ...message, author: user.document };
      }
      return message;
    });
    setMessages(updated);
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
    messages,
    ordered,
    getPrevious,
  };
}

export default useMessage;
