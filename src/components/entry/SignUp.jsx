import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useSignUp from "../../hooks/entry/useSignUp";
import Button from "../shared/buttons/Gradient";

function SignUp() {
  const { values, errors, message, handleInputChange, handleSubmit } =
    useSignUp();

  return (
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

      <Bottom>
        <div>
          <Button type="submit">Sign Up</Button>
          {message && <Message>{message}</Message>}
          {errors.response && <Error>{errors.response}</Error>}
        </div>

        <Small>
          Do you already have an account? Please use the{" "}
          <Link to="/auth/login">login form.</Link>
        </Small>
      </Bottom>
    </Form>
  );
}

export default SignUp;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media all and (min-width: 768px) {
    max-width: 60%;
  }
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
  color: ${(props) => props.theme.text_secondary};
  max-width: 50%;
`;

const Message = styled(Small)`
  color: ${(props) => props.theme.text_quaternary};
  max-width: 70%;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & a {
    color: ${(props) => props.theme.text_tertiary};

    &:hover {
      text-decoration: underline;
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
