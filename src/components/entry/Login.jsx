import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import socket from "../../socket/socket";
import Button from "../shared/buttons/Gradient";

function Login() {
  const initial = {
    identifier: "",
    password: "",
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({ ...initial, response: "" });
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);

    // Client-side validation
    // Check that all fields are filled.
    if (!values.identifier) {
      setErrors((prev) => {
        return { ...prev, identifier: "Email / Username must be specified" };
      });
    }

    if (!values.password) {
      setErrors((prev) => {
        return { ...prev, identifier: "Password must be specified" };
      });
    }

    // If there are errors, display them without submitting the form.
    let hasErrors = false;
    for (const field of Object.keys(errors)) {
      if (errors[field]) {
        hasErrors = true;
        break;
      }
    }

    if (hasErrors) return;

    /* Submit the form
    - If login is successful, return { user, jwt: JWT }
    - If login failed, return { errors: [] }
    */

    const response = await fetch(`${process.env.REACT_APP_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: values.identifier,
        password: values.password,
      }),
    });

    const json = await response.json();

    // If there are form errors, display them.
    if (json.errors) {
      json.errors.map((error) =>
        setErrors((prev) => {
          return {
            ...prev,
            [error.param]: error.msg,
          };
        })
      );
    }

    // If the user was logged-in properly, save the jwt and user information.
    if (json.token) {
      localStorage.setItem("jwt", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));
      socket.emit("authentification", JSON.stringify(json.user));
      history.push("/");
    }
  };

  return (
    <Container>
      <Header>
        <Heading>Welcome back</Heading>
        <div>We are delighted to see you again!</div>
      </Header>
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

        <Button>Submit</Button>
        {errors.response && <Error>{errors.response}</Error>}
      </Form>
      <Small>
        Not a member yet? <StyledLink to="/signup">Sign up now.</StyledLink>
      </Small>
    </Container>
  );
}

export default Login;

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
