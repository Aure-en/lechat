import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Group from "./Group";
import useOrder from "../../hooks/chat/useOrder";

function Messages({ messages, setEditing }) {
  const { ordered } = useOrder(messages);
  const ref = useRef(); // ref used to scroll to bottom

  // On new messages, scroll to bottom.
  // TO-DO : Improve it so it only scrolls down on first render + when the user is already at the bottom.
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
  }, [ordered]);

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
    background-color: ${(props) => props.theme.bg_primary};
  }
`;
