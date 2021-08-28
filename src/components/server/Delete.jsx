import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../shared/Modal";
import useDelete from "../../hooks/server/server/useDelete";

function Delete({ server }) {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, remove } = useDelete();

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Delete Server
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            await remove(server._id);
            setIsOpen(false);
          }}
        >
          <Header>
            <Heading>Delete Server</Heading>
            <p>
              Are you sure you want to delete <strong>{server.name}</strong>?
            </p>
            <p>
              All categories, channels and messages will be deleted, and you
              will be unable to recover them.
            </p>
          </Header>

          <Bottom>
            <DeleteBtn>Delete Server</DeleteBtn>
            {loading && <Small>Deleting server...</Small>}
          </Bottom>
        </Form>
      </Modal>
    </>
  );
}

export default Delete;

Delete.propTypes = {
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
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin: 0;
`;

const Bottom = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  color: ${(props) => props.theme.error};

  &:hover {
    color: ${(props) => props.theme.text_quaternary};
  }
`;

const DeleteBtn = styled.button`
  padding: 0.5rem 0.75rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.error};
  border: 1px solid ${(props) => props.theme.error};
`;

const Small = styled.small`
  display: block;
  position: absolute;
  color: ${(props) => props.theme.text_secondary};
  text-align: center;
  bottom: -1rem;
`;
