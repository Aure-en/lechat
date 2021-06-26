import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useDropdown from "../../hooks/shared/useDropdown";
import Delete from "./Delete";

import { ReactComponent as IconDots } from "../../assets/icons/general/dots.svg";

function More({ message, setEditing, setIsActive }) {
  const ref = useRef();
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);

  const remove = async (id) => {
    await fetch(`${process.env.REACT_APP_URL}/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

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

      {isDropdownOpen && (
        <Menu>
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
        </Menu>
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
  border: 1px solid ${(props) => props.theme.border};
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
  top: 0;
  right: 2rem;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background: ${(props) => props.theme.menu_bg};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 3px;
`;

const Option = styled.button`
  padding: 0.25rem 1rem;
  width: 100%;
  text-align: start;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.menu_bg_hover};
  }
`;
