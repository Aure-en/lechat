import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../shared/Modal";
import SubmitBtn from "../shared/buttons/Gradient";
import useDelete from "../../hooks/server/category/useDelete";

function Delete({ isOpen, setIsOpen, category }) {
  const { error, handleSubmit } = useDelete(category._id);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <Header>
          <Heading>Delete Category</Heading>
          <p>
            Are you sure you would like to delete the category{" "}
            <strong>{category.name}</strong> ?
          </p>
        </Header>

        {error && <Error>{error}</Error>}

        <Buttons>
          <SubmitBtn>Delete Category</SubmitBtn>
        </Buttons>
      </Form>
    </Modal>
  );
}

export default Delete;

Delete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin: 0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Error = styled.div`
  text-align: center;
  color: ${(props) => props.theme.error};
  font-size: 0.875rem;
`;
