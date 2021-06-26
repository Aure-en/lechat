import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "./Content";
import Modal from "../modals/Modal";

function Delete({ message }) {
  const [isOpen, setIsOpen] = useState(false);

  const remove = async (id) => {
    await fetch(`${process.env.REACT_APP_URL}/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Delete Message
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            remove(message._id);
          }}
        >
          <Header>
            <Heading>Delete Message</Heading>
            <p>Are you sure you want to delete this message ?</p>
          </Header>

          <div>
            <Message message={message} />
          </div>

          <Buttons>
            <SubmitBtn type="submit">Delete Message</SubmitBtn>
          </Buttons>
        </Form>
      </Modal>
    </>
  );
}

export default Delete;

Delete.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

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

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.25rem 1rem;
  width: 100%;
  text-align: start;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.more_bg_hover};
  }
`;

const SubmitBtn = styled.button``;
