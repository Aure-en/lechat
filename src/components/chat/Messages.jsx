import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socket from "../../socket/socket";

function Messages({ channelId, conversationId, setEditing }) {
  const url = conversationId
    ? `${process.env.REACT_APP_URL}/conversations/${conversationId}/messages`
    : `${process.env.REACT_APP_URL}/channels/${channelId}/messages`;
  const [messages, setMessages] = useState([]);

  const remove = async (id) => {
    await fetch(`${process.env.REACT_APP_URL}/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

  // Get messages
  useEffect(() => {
    (async () => {
      console.log("fetching");
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (!json.error) setMessages(json);
    })();
  }, []);

  // Set up socket listeners
  const handleInsert = (newMessage) => {
    setMessages([...messages, newMessage.document]);
  };

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
        prev.filter((message) => message._id !== deleted.document._id)
      );
    }
    console.log("DELETE");
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

  return (
    <ul>
      {messages.map((message) => (
        <li key={message._id}>
          {message.author.username} {message.text}
          {message.author._id ===
            JSON.parse(localStorage.getItem("user"))._id && (
            <>
              <button type="button" onClick={() => setEditing(message)}>
                Edit
              </button>
              <button type="button" onClick={() => remove(message._id)}>
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Messages;

Messages.propTypes = {
  channelId: PropTypes.string,
  conversationId: PropTypes.string,
  setEditing: PropTypes.func,
};

Messages.defaultProps = {
  channelId: undefined,
  conversationId: undefined,
  setEditing: () => {},
};
