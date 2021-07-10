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
  justify-content: space-around;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 10rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 2rem;
  line-height: 2.75rem;
  margin: 0;
`;
