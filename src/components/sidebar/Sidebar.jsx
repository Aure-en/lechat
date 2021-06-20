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
  padding: 0.5rem;
  overflow-y: auto;
  border-right: 1px solid ${(props) => props.theme.border};

  & > *:first-child {
    margin-bottom: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme.sidebar_border};
  }
`;
