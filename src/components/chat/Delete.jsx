import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "./Content";
import Modal from "../modals/Modal";
import SubmitBtn from "../shared/buttons/Gradient";

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

          <Content>
            <Message message={message} />
          </Content>

          <Buttons>
            <SubmitBtn>Delete Message</SubmitBtn>
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

const Content = styled.div`
  position: relative;
  display: grid;
  grid-template: repeat(2, auto) / auto 1fr;
  grid-column-gap: 1rem;
  padding: 0 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
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