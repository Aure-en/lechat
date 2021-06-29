import React from "react";
import styled from "styled-components";
import List from "../../components/server/List";
import Nav from "../../components/home/Nav";

function Servers() {
  return (
    <>
      <Nav />
      <Container>
        <List />
      </Container>
    </>
  );
}

export default Servers;

const Container = styled.main`
  padding: 1rem 2rem;
`;
