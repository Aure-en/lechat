import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import socket from "../../socket/socket";

function Messages({ channelId, conversationId, setEditing }) {
  const url = conversationId
    ? `${process.env.REACT_APP_URL}/conversations/${conversationId}/messages`
    : `${process.env.REACT_APP_URL}/channels/${channelId}/messages`;
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    console.log("MESSAGES", messages);
  }, [messages]);

  // Set up socket listeners
  const handleInsert = (newMessage) => {
    console.log(newMessage);
    setMessages([...messages, newMessage.document]);
    console.log("INSERT");
  };

  const handleUpdate = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    socket.on("insert", (document) => {
      handleInsert(document);
    });
    return () => socket.off("insert");
  }, [messages]);

  useEffect(() => {
    socket.on("update", handleUpdate);
  }, []);

  useEffect(() => {
    socket.on("delete", handleDelete);
  }, []);

  return (
    <ul>
      {messages.map((message) => (
        <li key={message._id}>
          {message.author.username} {message.text}
          {message.author._id ===
            JSON.parse(localStorage.getItem("user"))._id && (
            <button type="button" onClick={() => setEditing(message)}>
              Edit
            </button>
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
