import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as IconServers } from "../../../assets/icons/nav/grid.svg";

const Button = forwardRef(({ togglePanel }, ref) => {
  return (
    <StyledButton
      type="button"
      onClick={togglePanel}
      data-tip="Servers"
      data-for="nav"
      ref={ref}
    >
      <IconServers />
    </StyledButton>
  );
});

Button.propTypes = {
  togglePanel: PropTypes.func.isRequired,
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
