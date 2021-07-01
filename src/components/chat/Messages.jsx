import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Group from "./Group";

function Messages({ messages, setEditing }) {
  const [ordered, setOrdered] = useState([]);
  const ref = useRef(); // ref used to scroll to bottom

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

  // On new messages, scroll to bottom.
  // TO-DO : Improve it so it only scrolls down on first render + when the user is already at the bottom.
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
  }, [ordered]);

  // Group messages by author and time so that the author isn't displayed in front of every message.
  useEffect(() => {
    const ordered = [];
    const unordered = [...messages];

    unordered.map((message, index) => {
      // Create the first group from the first message
      if (index === 0) {
        ordered.push({
          author: message.author,
          timestamp: message.timestamp,
          messages: [message],
          _id: message._id,
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
          _id: message._id,
        });
      }
    });
    setOrdered(ordered);
  }, [messages]);

  return (
    <Ul ref={ref}>
      {ordered.map((messages) => (
        <Group key={messages._id} messages={messages} setEditing={setEditing} />
      ))}
    </Ul>
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

const Ul = styled.ul`
  padding: 0 1rem;
  margin-right: 0.25rem; // Prevents scrollbar from sticking to the right
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 0.5rem 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebars};
  }
`;
