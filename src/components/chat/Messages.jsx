import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Group from "./Group";
import useMessage from "../../hooks/chat/useMessage";
import useIntersection from "../../hooks/shared/useIntersection";
import useScroll from "../../hooks/chat/useScroll";

function Messages({ location, setEditing }) {
  const { ordered, getPrevious } = useMessage(location);
  const containerRef = useRef();
  const triggerRef = useRef();
  useIntersection(containerRef, triggerRef, getPrevious);
  useScroll(ordered, containerRef);

  return (
    <Ul ref={containerRef}>
      <div ref={triggerRef} />
      {ordered.map((messages) => (
        <Group key={messages._id} messages={messages} setEditing={setEditing} />
      ))}
    </Ul>
  );
}

export default Messages;

Messages.propTypes = {
  location: PropTypes.shape({
    conversation: PropTypes.string,
    server: PropTypes.string,
    channel: PropTypes.string,
  }).isRequired,
  setEditing: PropTypes.func,
};

Messages.defaultProps = {
  setEditing: () => {},
};

const Ul = styled.ul`
  padding: 0 1rem;
  margin-right: 0.25rem; // Prevents scrollbar from sticking to the right
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;

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
