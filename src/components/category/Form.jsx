import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useCreate from "../../hooks/server/category/useCreate";
import SubmitBtn from "../shared/buttons/Gradient";

// Form to create / update a category.
function Form({ serverId, category, setIsOpen }) {
  const { name, setName, error, onSubmit } = useCreate(serverId, category);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit();
    if (result) setIsOpen(false);
  };

  return (
    <div>
      <Header>
        <Heading>{category ? "Update" : "Create"} Category</Heading>
        <p>Gather related channels in a category for better organisation</p>
      </Header>
      <FormContainer onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name">
            Name
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter the category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Label>
          {error && <Error>{error}</Error>}
        </Field>

        <Button>
          <SubmitBtn>{category ? "Update" : "Create"} Category</SubmitBtn>
        </Button>
      </FormContainer>
    </div>
  );
}

export default Form;

Form.propTypes = {
  serverId: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
  setIsOpen: PropTypes.func,
};

Form.defaultProps = {
  category: undefined,
  setIsOpen: () => {},
};

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

const FormContainer = styled.form`
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
