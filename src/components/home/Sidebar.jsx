import React from "react";
import styled from "styled-components";
import Profile from "./Profile";

function Sidebar() {
  return (
    <Container>
      <Profile />
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  padding: 1rem;
`;
