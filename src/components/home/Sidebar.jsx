import React from "react";
import styled from "styled-components";
import Profile from "../user/Profile";
import Conversations from "../conversations/Conversations";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <Container>
      <Profile user={user} />
      <Conversations />
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  padding: 1rem;
`;
