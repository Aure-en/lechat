import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useSignUp from "../../hooks/useSignUp";
import Button from "../shared/buttons/Gradient";

function SignUp() {
  const { values, errors, handleInputChange, handleSubmit } = useSignUp();

  return (
    <Container>
      <Header>
        <Heading>Create an account</Heading>
        <div>Let&apos;s chat and have fun together!</div>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="username">
            Username
            <Input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleInputChange}
            />
          </Label>
          {errors.username && <Error>{errors.username}</Error>}
        </Field>

        <Field>
          <Label htmlFor="email">
            Email
            <Input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
          </Label>
          {errors.email && <Error>{errors.email}</Error>}
        </Field>

        <Field>
          <Label htmlFor="password">
            Password
            <Input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
          </Label>
          {errors.password && <Error>{errors.password}</Error>}
        </Field>

        <Field>
          <Label htmlFor="confirmation">
            Password Confirmation
            <Input
              type="password"
              id="confirmation"
              name="confirmation"
              value={values.confirmation}
              onChange={handleInputChange}
            />
          </Label>
          {errors.confirmation && <Error>{errors.confirmation}</Error>}
        </Field>

        <Button type="submit">Submit</Button>
        {errors.response && <Error>{errors.response}</Error>}
      </Form>
      <Small>
        Already have an account?{" "}
        <StyledLink to="/login">Sign in now.</StyledLink>
      </Small>
    </Container>
  );
}

export default SignUp;

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.border_primary};
  max-width: 30rem;
  padding: 3rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 2rem;
  line-height: 2.75rem;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 0.825rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.input_border};
  padding: 0.5rem 0 0.25rem 0;

  &::placeholder {
    color: ${(props) => props.theme.input_border};
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.input_border_active};
  }
`;

const Error = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 0.825rem;
`;

const Small = styled.small`
  display: block;
  font-size: 0.825rem;
  margin-top: 1rem;
  color: ${(props) => props.theme.text_secondary};
`;

const StyledLink = styled(Link)`
  &:hover {
    color: ${(props) => props.theme.text_primary};
  }
`;
