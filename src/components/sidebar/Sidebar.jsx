import React from "react";
import styled from "styled-components";
import Servers from "./servers/Servers";
import Conversations from "./conversations/Conversations";
import Create from "../modals/server/Server";

function Sidebar() {
  return (
    <Nav>
      <Conversations />
      <Servers />
      <Create />
    </Nav>
  );
}

export default Sidebar;

const Nav = styled.nav`
  padding: 0.75rem;
  overflow-y: auto;
  background: ${(props) => props.theme.bg_sidebar};
  margin: 1rem;
  margin-right: 0;
  border-radius: 1rem;

  & li:hover:before,
  & button:hover:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -0.75rem; // Sidebar padding
    border: 7px solid transparent;
    border-left: 7px solid ${(props) => props.theme.bg_sidebars};
    transform: translateY(-50%);
  }
`;
