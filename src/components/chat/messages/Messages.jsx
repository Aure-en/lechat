import React from "react";
import PropTypes from "prop-types";
import useFetch from "../../../hooks/useFetch";

function Messages({ channel, conversation }) {
  const url = conversation
    ? `${process.env.REACT_APP_URL}/conversations/${conversation}`
    : `${process.env.REACT_APP_URL}/channels/${channel}`;
  const { data: messages, error } = useFetch(url);

  return (
    <ul>
      {messages &&
        messages.map((message) => (
          <li>
            {message.author.username} {message.text}
          </li>
        ))}
    </ul>
  );
}

export default Messages;

Messages.propTypes = {
  channel: PropTypes.string,
  conversation: PropTypes.string,
};

Messages.defaultProps = {
  channel: undefined,
  conversation: undefined,
};
