import React from "react";
import styled from "styled-components";
import Add from "../../components/friends/Add";
import All from "../../components/friends/All";
import Nav from "../../components/home/Nav";
import Pending from "../../components/friends/Pending";

function Friends() {
  return (
    <>
      <Nav />
      <Container>
        <All />
        <Pending />
        <Add />
      </Container>
    </>
  );
}

export default Friends;

const Container = styled.main`
  display: flex;
  flex-direction: column;
`;
