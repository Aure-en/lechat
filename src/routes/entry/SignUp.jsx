import React from "react";
import styled from "styled-components";
import SignUpForm from "../../components/entry/SignUp";

function SignUp() {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
}

export default SignUp;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
