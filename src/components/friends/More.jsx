import React, { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useDropdown from "../../hooks/shared/useDropdown";
import Delete from "./Delete";
import { ReactComponent as IconDots } from "../../assets/icons/friend/dots.svg";

function More({ friend, friendship }) {
  const ref = useRef();
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);

  return (
    <Container ref={ref}>
      <Button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <IconDots />
      </Button>

      {isDropdownOpen && (
        <Menu>
          <Option to={`/conversations/${friend._id}`}>Send a message</Option>
          <Delete friend={friend} friendship={friendship} />
        </Menu>
      )}
    </Container>
  );
}

export default More;

More.propTypes = {
  friend: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  friendship: PropTypes.string.isRequired,
};

const Container = styled.div`
  position: relative;
  top: -2px;
`;

const Button = styled.button`
  padding: 0.5rem;
  padding-right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text_tertiary};
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 2rem;
  left: 0.5rem;
  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background: ${(props) => props.theme.more_bg};
  border: 1px solid ${(props) => props.theme.border_button};
  border-radius: 3px;
`;

const Option = styled(Link)`
  padding: 0.25rem 1rem;
  width: 100%;
  text-align: start;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.more_bg_hover};
  }
`;
