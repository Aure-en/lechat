import React, { useState } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Create from "../../server/Form";
import Modal from "../Modal";
import IconPlus from "../../../assets/icons/general/IconPlus";

function Server() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        data-tip="Create Server"
        data-offset="{'top': 16, 'right': 4}"
        data-for="create-server"
      >
        <IconPlus size={36} strokeWidth={0.5} />
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Create setIsOpen={setIsOpen} />
      </Modal>

      <ReactTooltip place="right" effect="solid" id="create-server" />
    </>
  );
}

export default Server;

const Button = styled.button`
  position: relative; // For the nav arrow :before.
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
