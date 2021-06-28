import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createPortal } from "react-dom";
import useDropdown from "../../hooks/shared/useDropdown";
import Delete from "./Delete";

import { ReactComponent as IconDots } from "../../assets/icons/general/dots.svg";

function More({ message, setEditing, setIsActive }) {
  const ref = useRef();
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);

  const pin = async (id) => {
    // TO-DO: Fetch to pin message
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isDropdownOpen]);

  return (
    <Container ref={ref}>
      <Button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <IconDots />
      </Button>

      {/* Menu must be positioned out of the chat container that has overflow: auto.
      Otherwise, the menu on the last message may cause a scroll.
      Because it is outside of the Container, it uses the container ref to be positioned properly. */}
      {isDropdownOpen && (
        <>
          {createPortal(
            <Menu
              $top={ref.current.getBoundingClientRect().top}
              $right={ref.current.getBoundingClientRect().left}
            >
              {message.author._id ===
                JSON.parse(localStorage.getItem("user"))._id && (
                <Option type="button" onClick={() => setEditing(message)}>
                  Edit Message
                </Option>
              )}
              <Option type="button" onClick={() => pin(message._id)}>
                Pin Message
              </Option>
              {message.author._id ===
                JSON.parse(localStorage.getItem("user"))._id && (
                <Delete message={message} />
              )}
            </Menu>,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
    </Container>
  );
}

export default More;

More.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  setEditing: PropTypes.func,
  setIsActive: PropTypes.func,
};

More.defaultProps = {
  setEditing: () => {},
  setIsActive: () => {},
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  transform: translateY(-50%);
  min-height: 1.5rem;
  z-index: 5;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.border_button};
  border-radius: 3px;
  padding: 0.07rem 0.15rem;
  background: ${(props) => props.theme.more_bg};
  color: ${(props) => props.theme.text_tertiary};

  &:hover {
    background: ${(props) => props.theme.more_bg_hover};
  }
`;

const Menu = styled.div`
  position: absolute;
  top: ${(props) => `${props.$top}px`};
  right: ${(props) => `calc(-${props.$right}px + 1rem)`};
  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background: ${(props) => props.theme.more_bg};
  border: 1px solid ${(props) => props.theme.border_button};
  border-radius: 3px;
`;

const Option = styled.button`
  padding: 0.25rem 1rem;
  width: 100%;
  text-align: start;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.more_bg_hover};
  }
`;
