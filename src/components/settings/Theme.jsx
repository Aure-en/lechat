import React from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

function Theme() {
  const { theme, changeTheme } = useTheme();
  return (
    <Button type="button" onClick={changeTheme}>
      <Letter $theme="light">L</Letter> <Line $theme={theme} />{" "}
      <Letter $theme="dark">D</Letter>
    </Button>
  );
}

export default Theme;

const Button = styled.button`
  display: flex;
  align-items: center;
`;

const Letter = styled.span`
  color: ${(props) =>
    props.$theme === "light" ? props.theme.send_bg : props.theme.text_tertiary};
  font-size: 1rem;
`;

const Line = styled.span`
  position: relative;
  display: inline-block;
  width: 2.5rem;
  margin: 0 1rem;
  height: 1px;
  background: linear-gradient(
    to right,
    ${(props) =>
      `${props.theme.bg_primary} 0%, ${props.theme.border_accent} 100%`}
  );

  &:before,
  &:after {
    position: absolute;
    content: "";
    border-radius: 50%;
    width: 0.7rem;
    height: 0.7rem;
  }

  // Light side circle
  &:before {
    background: ${(props) =>
      props.$theme === "light"
        ? props.theme.border_accent
        : props.theme.bg_secondary};
    border: 1px solid ${(props) => props.theme.border_accent};
    left: -0.35rem;
    top: -0.3rem;
  }

  // Dark side circle
  &:after {
    background: ${(props) =>
      props.$theme === "dark"
        ? props.theme.bg_sidebar
        : props.theme.bg_secondary};
    border: 1px solid ${(props) => props.theme.bg_sidebar};
    right: -0.35rem;
    top: -0.3rem;
  }
`;
