import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Border({ onClick, children }) {
  return (
    <Button type="button" onClick={onClick}>
      <span>{children}</span>
    </Button>
  );
}

export default Border;

Border.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const Button = styled.button`
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  align-self: flex-end;
  padding: 0.5rem 0.75rem;
  text-align: center;
  grid-column: 2;
  overflow: hidden;

  & > * {
    cursor: pointer;
  }

  &:before,
  &:after,
  & > span:before,
  & > span:after {
    position: absolute;
    content: "";
    transition: transform 0.3s ease-out, background 0.5s ease-out;
    background: ${(props) => props.theme.border_hover_primary};
  }

  &:before,
  &:after {
    right: 0;
    bottom: 0;
  }

  & > span:before,
  & > span:after {
    left: 0;
    top: 0;
  }

  &:before,
  & > span:before {
    width: 100%;
    height: 1px;
  }

  &:after,
  & > span:after {
    width: 1px;
    height: 100%;
  }

  &:before, // Bottom line
  & > span:before {
    // Top line
    transform: translateX(-100%);
  }

  &:after, // Right line
  & > span:after {
    // Left line
    transform: translateY(-100%);
  }

  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
    background: ${(props) => props.theme.border_hover_secondary};
  }
`;
