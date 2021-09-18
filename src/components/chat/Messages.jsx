import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Group from "./Group";
import useScroll from "../../hooks/chat/useScroll";
import ScrollToPresent from "./ScrollToPresent";

function Messages({ ordered, getPrevious, setEditing }) {
  // Used to load more messages when scrolling to the top
  const containerRef = useRef();
  const { scrollToBottom, hasScrolled, handleScroll } = useScroll(
    ordered,
    containerRef,
    getPrevious
  );

  return (
    <Wrapper>
      <Ul ref={containerRef} onScroll={handleScroll}>
        {ordered?.map((messages) => (
          <Group
            key={messages._id}
            messages={messages}
            setEditing={setEditing}
          />
        ))}
      </Ul>
      {hasScrolled && <ScrollToPresent scrollToPresent={scrollToBottom} />}
    </Wrapper>
  );
}

export default Messages;

Messages.propTypes = {
  ordered: PropTypes.arrayOf(
    PropTypes.shape({
      messages: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
        })
      ),
    })
  ),
  getPrevious: PropTypes.func,
  setEditing: PropTypes.func,
};

Messages.defaultProps = {
  ordered: [],
  getPrevious: () => {},
  setEditing: () => {},
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Ul = styled.ul`
  padding: 1rem;
  margin-right: 0.25rem; // Prevents scrollbar from sticking to the right
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  max-height: 100%;

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
