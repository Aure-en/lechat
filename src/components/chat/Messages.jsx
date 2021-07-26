import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Group from "./Group";
import useOrder from "../../hooks/chat/useOrder";
import useScroll from "../../hooks/chat/useScroll";

function Messages({ messages, setEditing, messagesRef }) {
  const { ordered } = useOrder(messages);
  useScroll(ordered, messagesRef); // handle scrolling

  return (
    <Ul ref={messagesRef}>
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
    background-color: ${(props) => props.theme.bg_primary};
  }
`;
