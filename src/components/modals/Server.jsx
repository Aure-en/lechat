import React, { useState } from "react";
import styled from "styled-components";
import Create from "../server/Form";
import Modal from "./Modal";

function Server() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        +
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Create />
      </Modal>
    </>
  );
}

export default Server;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${(props) => props.theme.server_icon_bg};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;
