import React from "react";
import styled from "styled-components";
import Server from "./Server";
import Conversation from "./Conversation";
import Create from "../modals/server/Server";

function Sidebar() {
  return (
    <Nav>
      <Conversation />
      <Server />
      <Create />
    </Nav>
  );
}

export default Sidebar;

const Nav = styled.nav`
  & > *:first-child {
    margin-bottom: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme.sidebar_border};
  }
`;
