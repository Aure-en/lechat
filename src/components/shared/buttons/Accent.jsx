import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Accent({ onClick, children }) {
  return (
    <Button onClick={onClick}>
      <span>{children}</span>
    </Button>
  );
}

export default Accent;

Accent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

const Button = styled.button`
  position: relative;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  align-self: flex-end;
  overflow: hidden;
  min-height: 2.2rem;

  & > span {
    display: flex;
    align-items: center;
    align-self: flex-end;
    background: ${(props) => props.theme.text_quaternary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background 0.3s linear;
  }

  &:hover > span {
    background: ${(props) => props.theme.text_tertiary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  & * {
    cursor: pointer;
  }

  &:before,
  &:after,
  & > span:before,
  & > span:after {
    position: absolute;
    content: "";
    transition: transform 0.5s linear;
  }

  &:before {
    background: ${(props) => `
    linear-gradient(to right,
    ${props.theme.text_quaternary} 0%,
    ${props.theme.text_quaternary} 50%,
    ${props.theme.text_tertiary} 50%,
    ${props.theme.text_tertiary} 100%)
    `};
  }

  & > span:before {
    background: ${(props) => `
    linear-gradient(to left,
    ${props.theme.text_quaternary} 0%,
    ${props.theme.text_quaternary} 50%,
    ${props.theme.text_tertiary} 50%,
    ${props.theme.text_tertiary} 100%)
    `};
  }

  &:after {
    background: ${(props) => `
    linear-gradient(to top,
    ${props.theme.text_quaternary} 0%,
    ${props.theme.text_quaternary} 50%,
    ${props.theme.text_tertiary} 50%,
    ${props.theme.text_tertiary} 100%)
    `};
  }

  & > span:after {
    background: ${(props) => `
    linear-gradient(to bottom,
    ${props.theme.text_quaternary} 0%,
    ${props.theme.text_quaternary} 50%,
    ${props.theme.text_tertiary} 50%,
    ${props.theme.text_tertiary} 100%)
    `};
  }

  &:before,
  &:after {
    right: 0;
  }

  & > span:before,
  & > span:after {
    left: 0;
  }

  &:before,
  & > span:before {
    width: 200%;
    height: 1px;
  }

  &:after,
  & > span:after {
    width: 1px;
    height: 200%;
  }

  // Bottom line
  &:before {
    bottom: 0;
    transform: translateX(50%);
  }

  // Top line
  & > span:before {
    transform: translateX(-50%);
    top: 0;
  }

  // Right line
  &:after {
    top: 0;
    transform: translateY(-50%);
  }

  // Left line
  & > span:after {
    bottom: 0;
    transform: translateY(50%);
  }

  &:hover:before,
  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
  }
`;
