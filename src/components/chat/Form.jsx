import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Form() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  console.log(location.pathname);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!message) return;

    // Save the message
    await fetch(`${process.env.REACT_APP_URL}${location.pathname}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit" disabled={!message}>
        Send
      </button>
    </form>
  );
}

export default Form;
