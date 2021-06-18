import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import Create from "../server/Form";

function Server() {
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        +
      </Button>

      {isOpen && (
        <>
          {ReactDOM.createPortal(
            <Create />,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
    </>
  );
}

export default Server;

Server.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

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
