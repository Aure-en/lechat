import { useState, useEffect } from "react";
import socket from "../../socket/socket";

/**
 * Fetch the messages from a certain conversation / server channel.
 * Update them in real time with socket listeners.
 * @param {object} location. Either :
 * - { conversation: {string} id }
 * - { channel: {string} id }
 */
function useMessage(location, lastMessageId) {
  const [url, setUrl] = useState("");
  const [messages, setMessages] = useState([]);

  // Set up endpoint url
  useEffect(() => {
    if (!location) return;
    if (location.conversation) {
      setUrl(
        `${process.env.REACT_APP_URL}/conversations/${location.conversation}/messages`
      );
    }

    if (location.channel) {
      setUrl(
        `${process.env.REACT_APP_URL}/channels/${location.channel}/messages`
      );
    }
  }, [location]);

  // Load messages
  useEffect(() => {
    if (!url) return;
    (async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const json = await res.json();

      // Append the fetched messages to the array
      if (
        !json.error &&
        json.length !== 0 &&
        !messages.find((message) => message._id === json[0]._id)
      ) {
        setMessages((prev) =>
          json.sort((a, b) => a.timestamp - b.timestamp).concat([...prev])
        );
      }
    })();
  }, [url]);

  // When lastMessageId changes, load previous messages.
  useEffect(() => {
    if (!lastMessageId) return;
    if (location.conversation) {
      setUrl(
        `${process.env.REACT_APP_URL}/conversations/${location.conversation}/messages?last_key=${lastMessageId}`
      );
    }

    if (location.channel) {
      setUrl(
        `${process.env.REACT_APP_URL}/channels/${location.channel}/messages?last_key=${lastMessageId}`
      );
    }
  }, [lastMessageId]);

  // Set up socket listeners
  const handleInsert = (newMessage) => {
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
  };

  const handleUpdate = (updated) => {
    // Doesn't update messages if we are the author
    // Messages was already updated instantaneously by the form handler.
    if (
      updated.document.author._id ===
      JSON.parse(localStorage.getItem("user"))._id
    )
      return;

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
    return () => socket.off("insert message", handleInsert);
  }, [messages]);

  useEffect(() => {
    socket.on("update message", handleUpdate);
    return () => socket.off("update message", handleUpdate);
  }, [messages]);

  useEffect(() => {
    socket.on("delete message", handleDelete);
    return () => socket.off("delete message", handleDelete);
  }, [messages]);

  useEffect(() => {
    socket.on("user update", handleUserUpdate);
    return () => socket.off("user update", handleUserUpdate);
  }, [messages]);

  return {
    messages,
    setMessages,
  };
}

export default useMessage;
