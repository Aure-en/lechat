import React from "react";
import styled from "styled-components";
import List from "../../components/server/List";
import Nav from "../../components/home/Nav";

function Servers() {
  return (
    <Wrapper>
      <Nav />
      <Container>
        <List />
      </Container>
    </Wrapper>
  );
}

export default Servers;

const Wrapper = styled.div`
  background: ${(props) => props.theme.bg_secondary};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
`;

const Container = styled.main`
  padding: 1rem 2rem;
`;
