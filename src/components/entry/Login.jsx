import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useLogin from "../../hooks/entry/useLogin";
import Button from "../shared/buttons/Gradient";

function Login() {
  const { values, errors, message, handleInputChange, handleSubmit } =
    useLogin();

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="identifier">
          Email / Username
          <Input
            type="text"
            id="identifier"
            name="identifier"
            value={values.identifier}
            onChange={handleInputChange}
            placeholder="Enter your email or username"
          />
        </Label>
        {errors.identifier && <Error>{errors.identifier}</Error>}
      </Field>

      <Field>
        <Label htmlFor="password">
          Password
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleInputChange}
          />
        </Label>
        {errors.password && <Error>{errors.password}</Error>}
      </Field>

      <Bottom>
        <div>
          <Button>Log In</Button>
          {message && <Message>{message}</Message>}
          {errors.response && <Error>{errors.response}</Error>}
        </div>
        <Small>
          Not a member yet? <Link to="/auth/signup">Sign up now.</Link>
        </Small>
      </Bottom>
    </Form>
  );
}

export default Login;

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

const Error = styled.small`
  color: ${(props) => props.theme.error};
  font-size: 0.825rem;
`;

const Small = styled.small`
  display: block;
  font-size: 0.825rem;
  color: ${(props) => props.theme.text_secondary};
`;

const Message = styled(Small)`
  color: ${(props) => props.theme.text_quaternary};
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
