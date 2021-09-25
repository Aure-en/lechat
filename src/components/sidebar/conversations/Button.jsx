import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as IconChat } from "../../../assets/icons/nav/chat.svg";

const Button = forwardRef(({ togglePanel, number }, ref) => {
  return (
    <StyledButton
      type="button"
      onClick={togglePanel}
      data-tip="Conversations"
      data-for="nav"
      ref={ref}
    >
      <IconChat />
      {number > 0 && <Number>{number > 9 ? "9+" : number}</Number>}
    </StyledButton>
  );
});

Button.propTypes = {
  togglePanel: PropTypes.func.isRequired,
  number: PropTypes.number,
};

Button.defaultProps = {
  number: 0,
};

export default Button;

const StyledButton = styled.button`
  position: relative;

  &:hover:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: calc(-1rem - 1px);
    border: 8px solid transparent;
    border-left: 8px solid ${(props) => props.theme.sidebar_button};
    transform: translateY(-50%);
  }
`;

const Number = styled.span`
  position: absolute;
  right: -0.25rem;
  bottom: 0;
  background: ${(props) => props.theme.send_bg};
  color: ${(props) => props.theme.bg_secondary};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 400;
`;
