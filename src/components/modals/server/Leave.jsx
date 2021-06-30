import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "../Modal";
import Button from "../../shared/buttons/Gradient";

function Leave({ isOpen, setIsOpen, server }) {
  const history = useHistory();
  const location = useLocation();

  const leave = async (serverId) => {
    // Leave server
    await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/servers/${serverId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Redirect to homepage if we were in the server
    if (location.pathname.match(new RegExp(`/servers/${serverId}`))) {
      history.push("/");
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          leave(server._id);
        }}
      >
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
