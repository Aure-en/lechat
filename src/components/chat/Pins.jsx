import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createPortal } from "react-dom";
import usePin from "../../hooks/chat/usePin";
import useDropdown from "../../hooks/shared/useDropdown";
import useIntersection from "../../hooks/shared/useIntersection";
import Pin from "./Pin";

// Icons
import { ReactComponent as IconPin } from "../../assets/icons/chat/pin.svg";
import IconClose from "../../assets/icons/general/IconClose";

function Pins({ location }) {
  // Dropdown system
  const containerRef = useRef();
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(containerRef);

  // Pinned messages, function to load more of them.
  const { messages, getPrevious } = usePin(location);

  // Refs to know when we have scrolled to the last pin
  // So we know we should load more.
  const pinsRef = useRef(); // Pins container.
  const triggerRef = useRef(); // When we reach this ref, load more pins.
  useIntersection(pinsRef, triggerRef, getPrevious);

  return (
    <div ref={containerRef}>
      <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <IconPin />
      </button>

      {/* Menu must be positioned out of the chat container that has overflow: auto to not be cut.
      Because it is outside of the Container, it uses the container ref to be positioned properly. */}
      {isDropdownOpen && (
        <>
          {createPortal(
            <Container
              $top={containerRef.current.getBoundingClientRect().top}
              $right={containerRef.current.getBoundingClientRect().left}
              ref={pinsRef}
            >
              <Header>
                <Heading>Pins</Heading>
                <Button type="button" onClick={() => setIsDropdownOpen(false)}>
                  <IconClose />
                </Button>
              </Header>
              <Content>
                {messages.map((message) => (
                  <Pin key={`pin-${message._id}`} message={message} />
                ))}
                <div ref={triggerRef} />
              </Content>
            </Container>,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
    </div>
  );
}

export default Pins;

Pins.propTypes = {
  location: PropTypes.shape({
    conversation: PropTypes.string,
    server: PropTypes.string,
    channel: PropTypes.string,
  }).isRequired,
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

const Heading = styled.h2`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  display: grid;
  grid-template-rows: min-content 1fr;
  border: 1px solid ${(props) => props.theme.border_button};
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 1rem;
  z-index: 10;
  padding-bottom: 2rem;

  @media all and (min-width: 768px) {
    top: ${(props) => `${props.$top}px`};
    right: ${(props) => `calc(-${props.$right}px + 1rem)`};
    left: initial;
    width: 40rem;
    height: 40rem;
  }
`;

const Content = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 2rem;
  margin-right: 0.25rem;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }

  & > li {
    margin-bottom: 1rem;
  }

  & > li:last-child {
    margin-bottom: 0;
  }
`;

const Button = styled.button`
  color: ${(props) => props.theme.text_secondary};

  &:hover {
    color: ${(props) => props.theme.text_tertiary};
  }

  @media all and (min-width: 768px) {
    display: none;
  }
`;
