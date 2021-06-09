import React from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

function Messages({ channelId, conversationId, setEditing }) {
  const url = conversationId
    ? `${process.env.REACT_APP_URL}/conversations/${conversationId}/messages`
    : `${process.env.REACT_APP_URL}/channels/${channelId}/messages`;
  const { data: messages, error } = useFetch(url);

  return (
    <ul>
      {messages &&
        messages.map((message) => (
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
