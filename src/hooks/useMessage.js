import { useState, useEffect } from "react";
import socket from "../socket/socket";

function useMessage(url) {
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    socket.on("insert", (document) => {
      handleInsert(document);
    });
    return () => socket.off("insert");
  }, [messages]);

  useEffect(() => {
    socket.on("update", (document) => {
      handleUpdate(document);
    });
    return () => socket.off("update");
  }, [messages]);

  useEffect(() => {
    socket.on("delete", (document) => {
      handleDelete(document);
    });
    return () => socket.off("delete");
  }, [messages]);

  return {
    messages,
    setMessages,
  };
}

export default useMessage;
