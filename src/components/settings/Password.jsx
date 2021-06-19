import React from "react";
import styled from "styled-components";
import usePassword from "../../hooks/settings/usePassword";
import SubmitBtn from "../shared/buttons/Gradient";

function Password() {
  const { values, setValues, errors, handleSubmit } = usePassword();

  return (
    <div>
      <Header>
        <Heading>Change your password</Heading>
        <p>The more complicated, the better.</p>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="current_password">
            <Input
              type="password"
              id="current_password"
              name="current_password"
              placeholder="Current password"
              value={values.current}
              onChange={(e) =>
                setValues((prev) => {
                  return { ...prev, current: e.target.value };
                })
              }
            />
          </Label>
          {errors.current && <Error>{errors.current}</Error>}
        </Field>

        <Field>
          <Label htmlFor="new_password">
            <Input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="New password"
              value={values.password}
              onChange={(e) =>
                setValues((prev) => {
                  return { ...prev, new: e.target.value };
                })
              }
            />
          </Label>
          {errors.new && <Error>{errors.new}</Error>}
        </Field>

        <Field>
          <Label htmlFor="confirm_password">
            <Input
              type="password"
              id="confirm_password"
              name="confirm_passwordd"
              placeholder="Confirm new password"
              value={values.confirmation}
              onChange={(e) =>
                setValues((prev) => {
                  return { ...prev, confirmation: e.target.value };
                })
              }
            />
          </Label>
          {errors.confirmation && <Error>{errors.confirmation}</Error>}
        </Field>

        <Button>
          <SubmitBtn type="submit">Update Password</SubmitBtn>
        </Button>
      </Form>
    </div>
  );
}

export default Password;

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
