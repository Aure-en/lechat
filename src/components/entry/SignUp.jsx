import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../shared/Submit";

function SignUp() {
  const initial = {
    username: "",
    email: "",
    password: "",
    confirmation: "",
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

    let hasErrors = false;
    Object.keys(values).map((value) => {
      if (!values[value]) {
        setErrors((prev) => {
          return {
            ...prev,
            [value]: `${
              value[0].toUpperCase() + value.slice(1)
            } must be specified.`,
          };
        });
      }
    });

    for (const field of Object.keys(errors)) {
      if (errors[field]) {
        hasErrors = true;
        break;
      }
    }

    // Check that password and confirmation have the same value
    if (values.password !== values.confirmation) {
      setErrors({
        ...errors,
        confirmation: "Password and confirmation are different.",
      });
      hasErrors = true;
    }
    // If there are errors, display them without submitting the Form.
    if (hasErrors) return;

    /* Submit the Form
    - If SignUp is successful, return { user, jwt: JWT }
    - If SignUp failed, return { errors: [] }
    */

    const response = await fetch(`${process.env.REACT_APP_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    const json = await response.json();

    // If there are Form errors, display them.
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

    // If the user was created and logged-in properly, save the jwt and user inFormation.
    if (json.token) {
      localStorage.setItem("jwt", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));
      history.push("/");
    }
  };

  return (
    <Container>
      <Header>
        <Heading>Create an account</Heading>
        <div>Let's chat and have fun together!</div>
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
