import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Conversations from "./conversations/Conversations";
import Home from "./links/Home";
import Friends from "./links/Friends";
import Servers from "./servers/Servers";
import Settings from "./links/Settings";
import LogOut from "./links/LogOut";

function Sidebar() {
  return (
    <Nav>
      <Content>
        <Home />
        <Servers />
        <Conversations />
        <Friends />
        <Settings />
      </Content>
      <Content>
        <LogOut />
      </Content>
      <ReactTooltip id="nav" effect="solid" place="right" />
    </Nav>
  );
}

export default Sidebar;

const Nav = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 4rem;
  padding: 1rem 0.75rem;
  background: ${(props) => props.theme.bg_sidebar};
  margin: 1rem;
  margin-right: 0;
  border-radius: 1rem;
  color: ${(props) => props.theme.sidebar_button};
  transform-style: preserve-3d; // For transform: translateZ on side-panel.
  z-index: 5;
`;

const Content = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;

  & > li,
  & > button,
  & > a {
    position: relative;
  }

  & > li:hover:before,
  & > button:hover:before,
  & > a:hover:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: calc(-1rem);
    border: 8px solid transparent;
    border-left: 8px solid ${(props) => props.theme.sidebar_button};
    transform: translateY(-50%);
  }
`;
