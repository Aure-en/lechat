import React from "react";
import styled from "styled-components";
import List from "../../components/server/List";
import Nav from "../../components/home/Nav";
import Gradient from '../../components/shared/links/Gradient';

function Servers() {
  return (
    <Wrapper>
      <Nav />
      <Container>
        <List />
      </Container>
      <Gradient to='/explore'>Explore Servers</Gradient>
    </Wrapper>
  );
}

export default Servers;

const Wrapper = styled.div`
  background: ${(props) => props.theme.bg_secondary};
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: -webkit-fill-available;
  margin: 0;
  border-radius: 1rem;
  padding: 1rem;

  @media all and (min-width: 768px) {
    height: calc(100vh - 1rem);
    border-radius: 1rem 1rem 0 0;
    margin-top: 1rem;
    margin-right: 1rem;
  }
`;

const Container = styled.main`
  padding: 1rem 2rem;
  margin-right: 0.25rem; // Makes the scrollbar not stick to the right.
  overflow-y: auto;
  flex: 1;

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
