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
`;
