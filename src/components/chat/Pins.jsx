import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createPortal } from "react-dom";
import usePin from "../../hooks/chat/usePin";
import useDropdown from "../../hooks/shared/useDropdown";
import Pin from "./Pin";

import { ReactComponent as IconPin } from "../../assets/icons/chat/pin.svg";
import IconClose from "../../assets/icons/general/IconClose";

function Pins({ location }) {
  // Dropdown system
  const ref = useRef();
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);

  // Messages
  const { messages, getPrevious } = usePin(location);

  return (
    <Wrapper ref={ref}>
      <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <IconPin />
      </button>

      {/* Menu must be positioned out of the chat container that has overflow: auto to not be cut.
      Because it is outside of the Container, it uses the container ref to be positioned properly. */}
      {isDropdownOpen && (
        <>
          {createPortal(
            <Container
              $top={ref.current.getBoundingClientRect().top}
              $right={ref.current.getBoundingClientRect().left}
            >
              <Header>
                <Heading>Pins</Heading>
              </Header>
              <Content>
                {messages.map((message) => (
                  <Pin key={`pin-${message._id}`} message={message} />
                ))}
              </Content>
            </Container>,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
    </Wrapper>
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

const Wrapper = styled.div``;

const Header = styled.div`
  padding: 2rem;
`;

const Heading = styled.h2`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
`;

const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: min-content 1fr;
  top: ${(props) => `${props.$top}px`};
  right: ${(props) => `calc(-${props.$right}px + 1rem)`};
  border: 1px solid ${(props) => props.theme.border_button};
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 1rem;
  width: 40rem;
  height: 40rem;
  z-index: 10;
  padding-bottom: 2rem;
`;

const Content = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 2rem 2rem 2rem;
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
