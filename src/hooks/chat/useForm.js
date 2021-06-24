import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function useForm(conversationId, message, setEditing, setMessages) {
  const [text, setText] = useState("");
  const location = useLocation();

  // If we want to edit a message, load its text.
  useEffect(() => {
    message ? setText(message.text) : setText("");
  }, [message]);

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    // Validation
    if (!text) return;

    // Update the messages displayed without waiting for the dabatase on update
    // Cannot do that with adding message unless I set an _id myself.
    if (message) {
      setMessages((prev) =>
        [...prev].map((elem) =>
          elem._id.toString() === message._id
            ? {
                author: {
                  username: JSON.parse(localStorage.getItem("user")).username,
                  _id: JSON.parse(localStorage.getItem("user"))._id,
                },
                text,
                _id: message._id,
              }
            : elem
        )
      );
    }

    // Save the message in the database (create or update)
    // -- TO-DO -- Find a cleaner way to get the request URL.
    const url = message
      ? `${process.env.REACT_APP_URL}/messages/${message._id}`
      : location.pathname.includes("servers")
      ? `${process.env.REACT_APP_URL}${location.pathname}/messages`
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

    // Reset the form
    if (message) {
      setEditing(false);
    }

    setText("");
  };

  return {
    text,
    setText,
    handleSubmit,
  };
}

export default useForm;
