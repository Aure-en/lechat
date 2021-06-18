import React from "react";
import styled from "styled-components";
import LoginForm from "../../components/entry/Login";

function Login() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
