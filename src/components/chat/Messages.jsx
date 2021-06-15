import React from "react";
import PropTypes from "prop-types";

function Messages({ messages, setEditing }) {
  const remove = async (id) => {
    await fetch(`${process.env.REACT_APP_URL}/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

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
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        username: PropTypes.string,
        _id: PropTypes.string,
      }),
      text: PropTypes.string,
      _id: PropTypes.string,
    })
  ).isRequired,
  setEditing: PropTypes.func,
};

Messages.defaultProps = {
  setEditing: () => {},
};
