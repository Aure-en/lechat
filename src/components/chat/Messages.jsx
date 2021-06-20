import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Group from "./Group";

function Messages({ messages, setEditing }) {
  const [ordered, setOrdered] = useState([]);

  // Helper function to compare dates
  const compareDates = (timestamp1, timestamp2) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    if (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
      return true;
    return false;
  };

  // Group messages by author and time so that the author isn't displayed in front of every message.
  useEffect(() => {
    if (messages.length === 0) return;
    const ordered = [];
    const unordered = [...messages];

    unordered.map((message, index) => {
      // Create the first group from the first message
      if (index === 0) {
        ordered.push({
          author: message.author,
          timestamp: message.timestamp,
          messages: [message],
        });
        return;
      }

      /*
        Loop over messages.
        - If the message has the same author and same date as the previous one,
          push it in the same group.
        - Else, create a new group of messages.
      */

      if (
        message.author._id === ordered[ordered.length - 1].author._id &&
        compareDates(message.timestamp, ordered[ordered.length - 1].timestamp)
      ) {
        ordered[ordered.length - 1].messages.push(message);
      } else {
        ordered.push({
          author: message.author,
          timestamp: message.timestamp,
          messages: [message],
        });
      }
    });

    setOrdered(ordered);
  }, [messages]);

  return (
    <ul>
      {ordered.map((messages) => (
        <Group key={message._id} messages={messages} setEditing={setEditing} />
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
