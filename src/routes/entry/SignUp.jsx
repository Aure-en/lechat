import React from "react";
import styled from "styled-components";
import SignUpForm from "../../components/entry/SignUp";

function SignUp() {
  return (
    <Container>
      <Header>
        <Heading>Create an account</Heading>
        <div>Let&apos;s chat and have fun together!</div>
      </Header>

      <SignUpForm />
    </Container>
  );
}

export default SignUp;

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
