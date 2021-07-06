import React from "react";
import styled from "styled-components";
import Add from "../../components/friends/Add";
import All from "../../components/friends/All";
import Nav from "../../components/home/Nav";
import Pending from "../../components/friends/Pending";

function Friends() {
  return (
    <Wrapper>
      <Nav />
      <Container>
        <All />
        <Pending />
        <Add />
      </Container>
    </Wrapper>
  );
}

export default Friends;

const Wrapper = styled.div`
  background: ${(props) => props.theme.bg_secondary};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;
