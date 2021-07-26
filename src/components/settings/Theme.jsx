import React from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import { ReactComponent as IconLight } from "../../assets/icons/theme/light.svg";
import { ReactComponent as IconDark } from "../../assets/icons/theme/dark.svg";

function Theme() {
  const { theme, changeTheme } = useTheme();

  return (
    <Button type="button" onClick={changeTheme}>
      {theme === "light" ? <IconDark /> : <IconLight />}
    </Button>
  );
}

export default Theme;

const Button = styled.button`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text_tertiary};
`;
