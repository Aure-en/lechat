import React from "react";
import styled from "styled-components";
import Servers from "./servers/Servers";
import Conversation from "./Conversation";
import Create from "../modals/server/Server";

function Sidebar() {
  return (
    <Nav>
      <Conversation />
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
  border-radius: 1rem;
`;
