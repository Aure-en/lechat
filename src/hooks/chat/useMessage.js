import { useState, useEffect } from "react";
import socket from "../../socket/socket";

function useMessage(url) {
  const [messages, setMessages] = useState([]);

  // Checks the location to know if the current room is related to the change.

  // Load messages
  useEffect(() => {
    if (!url) return;
    (async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log(res.headers.get("X-Total-Count"));
      const json = await res.json();
      if (!json.error) setMessages(json);
    })();
  }, [url]);

  // Set up socket listeners
  const handleInsert = (newMessage) => {
    setMessages([...messages, newMessage.document]);
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
        prev.filter((message) => message._id !== deleted.document._id)
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
