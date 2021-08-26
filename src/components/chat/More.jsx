import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { usePermission } from "../../context/PermissionContext";
import { useAuth } from "../../context/AuthContext";
import useDropdown from "../../hooks/shared/useDropdown";
import Delete from "./Delete";

import { ReactComponent as IconDots } from "../../assets/icons/general/dots.svg";

function More({ message, setEditing, setIsActive }) {
  // Dropdown system
  const ref = useRef();
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);

  // Used to check if the user has the permission
  // to:
  //   - Delete the message (=user is either the author or has server permissions)
  //   - Edit the message (=user is the author)
  const { messages, pins } = usePermission();
  const { user } = useAuth();

  useEffect(() => {
    if (isDropdownOpen) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isDropdownOpen]);

  const pin = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER}/messages/${id}/pin`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
  };

  /* Menu only opens if the user can access any of the following options (pinning, editing, deleting a message...) */
  if (
    (message.author._id !== user._id &&
      !messages.includes(user._id) &&
      (!pins.includes(user._id) || message.pinned)) ||
    message.tempId // If it has a tempId, it hasn't been saved in the DB yet.
  ) {
    return <></>;
  }

  return (
    <Container ref={ref}>
      <Button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <IconDots />
      </Button>

      {/* Menu must be positioned out of the chat container that has overflow: auto.
      Otherwise, the menu on the last message may cause a scroll.
      Because it is outside of the Container, it uses the container ref to be positioned properly.
    
      Each button is only displayed if the user fulfills the permissions conditions:
      - Edit button: only displayed for the message's author
      - Pin button: only displayed to users who can pins in a server / conversation.
      - Delete: only displayed to author and server's admin.
      */}
      {isDropdownOpen && (
        <>
          {createPortal(
            <Menu
              $top={ref.current.getBoundingClientRect().top}
              $right={ref.current.getBoundingClientRect().left}
            >
              {message.author._id === user._id && (
                <Option type="button" onClick={() => setEditing(message)}>
                  Edit Message
                </Option>
              )}

              {pins.includes(user._id) && !message.pinned && (
                <Option type="button" onClick={() => pin(message._id)}>
                  Pin Message
                </Option>
              )}

              {(message.author._id === user._id ||
                messages.includes(user._id)) && <Delete message={message} />}
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
    author: PropTypes.shape({
      _id: PropTypes.string,
    }),
    pinned: PropTypes.bool,
    tempId: PropTypes.number,
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
  background: ${(props) => props.theme.bg_secondary};
  color: ${(props) => props.theme.text_tertiary};

  &:hover {
    background: ${(props) => props.theme.bg_secondary_hover};
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
  background: ${(props) => props.theme.bg_secondary};
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
    background: ${(props) => props.theme.bg_secondary_hover};
  }
`;
