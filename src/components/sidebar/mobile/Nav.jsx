import React from "react";
import styled from "styled-components";
import Home from "../links/Home";
import Friends from "../links/Friends";
import Settings from "../links/Settings";

function Nav() {
  return (
    <Container>
      <Home />
      <Friends />
      <Settings />
    </Container>
  );
}

export default Nav;

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  padding: 0.75rem;
  background: ${(props) => props.theme.bg_sidebar};
  border-radius: 1rem;
  color: ${(props) => props.theme.sidebar_button};
  z-index: 3;
`;
