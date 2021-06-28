import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../modals/Modal";
import SubmitBtn from "../shared/buttons/Gradient";

function Delete({ friend, friendship }) {
  const [isOpen, setIsOpen] = useState(false);

  const remove = async (friendship) => {
    await fetch(`${process.env.REACT_APP_URL}/friends/${friendship}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <Option type="button" onClick={() => setIsOpen(true)}>
        Delete Friend
      </Option>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            remove(friendship);
          }}
        >
          <Heading>Delete Friend</Heading>

          <p>
            Are you sure you want to permanently delete{" "}
            <strong>{friend.username}</strong> from your friends?
            You will be unable to undo this action.
          </p>

          <Buttons>
            <SubmitBtn>Delete Friend</SubmitBtn>
          </Buttons>
        </Form>
      </Modal>
    </>
  );
}

export default Delete;

Delete.propTypes = {
  friend: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  friendship: PropTypes.string.isRequired,
};

const Option = styled.button`
  padding: 0.25rem 1rem;
  width: 100%;
  text-align: start;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.more_bg_hover};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 25rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.75rem;
  line-height: 2.75rem;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
