import React from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

function Messages({ channelId, conversationId }) {
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
          </li>
        ))}
    </ul>
  );
}

export default Messages;

Messages.propTypes = {
  channelId: PropTypes.string,
  conversationId: PropTypes.string,
};

Messages.defaultProps = {
  channelId: undefined,
  conversationId: undefined,
};
