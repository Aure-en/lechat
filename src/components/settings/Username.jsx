import React from "react";
import styled from "styled-components";
import useUsername from "../../hooks/settings/useUsername";
import SubmitBtn from "../shared/buttons/Gradient";

function Username() {
  const { values, setValues, errors, handleSubmit } = useUsername();

  return (
    <div>
      <Header>
        <Heading>Change your username</Heading>
        <p>Your username is how your friends will see you as.</p>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="username">
            <Input
              type="text"
              id="username"
              name="username"
              value={values.username}
              placeholder="New username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </Label>
          {errors.username && <Error>{errors.username}</Error>}
        </Field>

        <Field>
          <Label htmlFor="password">
            <Input
              type="password"
              id="password"
              name="password"
              value={values.password}
              placeholder="Current password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </Label>
          {errors.password && <Error>{errors.password}</Error>}
        </Field>

        <Button>
          <SubmitBtn type="submit">Update Username</SubmitBtn>
        </Button>
      </Form>
    </div>
  );
}

export default Username;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
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

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
`;
