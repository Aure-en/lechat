import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../shared/Modal";
import Button from "../shared/buttons/Gradient";
import useLeave from "../../hooks/server/useLeave";

function Leave({ isOpen, setIsOpen, server }) {
  const { handleSubmit } = useLeave(server._id);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <Header>
          <Heading>Leave Server</Heading>
          <p>
            Are you sure you want to leave the server{" "}
            <strong>{server.name}</strong> ? You will be unable to join again
            unless you receive an invitation.
          </p>

          <Buttons>
            <Button>Leave Server</Button>
          </Buttons>
        </Header>
      </Form>
    </Modal>
  );
}

export default Leave;

Leave.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  server: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;
