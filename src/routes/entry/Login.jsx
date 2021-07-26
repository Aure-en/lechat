import React from "react";
import styled from "styled-components";
import LoginForm from "../../components/entry/Login";

function Login() {
  return (
    <Container>
      <Header>
        <Heading>Welcome back</Heading>
        <div>We are delighted to see you again!</div>
      </Header>

      <LoginForm />
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media all and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  align-self: center;

  @media all and (min-width: 768px) {
    max-width: 10rem;
    align-self: initial;
  }
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 2rem;
  line-height: 2.75rem;
  margin: 0;
`;
