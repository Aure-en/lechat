import React from "react";
import styled from "styled-components";
import useEmail from "../../hooks/settings/useEmail";
import SubmitBtn from "../shared/buttons/Gradient";

function Email() {
  const { values, setValues, errors, handleSubmit } = useEmail();
  return (
    <div>
      <Header>
        <Heading>Change your email</Heading>
        <p>
          Update your email below by entering your new email address and current
          password.
        </p>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="email">
            <Input
              type="email"
              id="email"
              name="email"
              value={values.email}
              placeholder="New email address"
              onChange={(e) =>
                setValues((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
          </Label>
          {errors.email && <Error>{errors.email}</Error>}
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
                setValues((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </Label>
          {errors.password && <Error>{errors.password}</Error>}
        </Field>

        <Button>
          <SubmitBtn type="submit">Update Email</SubmitBtn>
        </Button>
      </Form>
    </div>
  );
}

export default Email;

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
