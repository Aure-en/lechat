import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function Form({ conversationId, message }) {
  const [text, setText] = useState("");
  const location = useLocation();

  // If we want to edit a message, load its text.
  useEffect(() => {
    setText(message.text);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!text) return;

    // Save the message (create or update)

    // -- TO-DO -- Find a cleaner way to get the request URL.
    const url = message
      ? `${process.env.REACT_APP_URL}/messages/${message._id}`
      : location.pathname.includes('servers') ? 
        `${process.env.REACT_APP_URL}${location.pathname}/messages`
        : `${process.env.REACT_APP_URL}/conversations/${conversationId}/messages`;

    const method = message ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        id="message"
        name="message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit" disabled={!text}>
        Send
      </button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Form.defaultProps = {
  message: undefined,
};
