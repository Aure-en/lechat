import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function Form({ message }) {
  const [text, setText] = useState(message.text || "");
  const location = useLocation();

  useEffect(() => {
    setText(message.text);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!text) return;

    // Save the message (create or update)
    const url = message
      ? `${process.env.REACT_APP_URL}/messages/${message._id}`
      : `${process.env.REACT_APP_URL}${location.pathname}/messages`;

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
