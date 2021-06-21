import React, { useState } from "react";
import styled from "styled-components";
import Create from "../../server/Form";
import Modal from "../Modal";
import IconPlus from "../../../assets/icons/general/IconPlus";

function Server() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        <IconPlus size={36} strokeWidth={0.5} />
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Create setIsOpen={setIsOpen} />
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
  background: ${(props) => props.theme.bg_primary};
  color: ${(props) => props.theme.text_tertiary};
  font-size: 1.5rem;
`;
