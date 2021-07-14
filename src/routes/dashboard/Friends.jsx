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
  height: calc(100vh - 1rem);
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  margin-right: 0.25rem; // Makes the scrollbar not stick to the right.
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 0.5rem 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }
`;
