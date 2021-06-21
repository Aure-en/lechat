import React from "react";
import styled from "styled-components";
import Server from "./Server";
import Conversation from "./Conversation";
import Create from "../modals/server/Server";
import socket from "../../socket/socket";

function Sidebar() {
  return (
    <Nav>
      <Conversation />
      <Server />
      <Create />
      {/* <button type="button" onClick={() => console.log(socket.listeners("insert"))}>
        Listener
      </button> */}
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
