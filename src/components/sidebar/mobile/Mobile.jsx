import React from "react";
import styled from "styled-components";
import Left from "./Left";
import Right from "./Right";
import Nav from "./Nav";

function Mobile() {
  return (
    <Container>
      <Content>
        <Left />
        <Right />
      </Content>
      <Nav />
    </Container>
  );
}

export default Mobile;

const Container = styled.div`
  position: relative;
  z-index: 5;
`;

const Content = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
`;
