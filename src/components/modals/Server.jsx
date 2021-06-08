import React from "react";
import ReactDOM from "react-dom";
import useModal from "../../hooks/useModal";
import Form from "../server/Form";

function Server() {
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Create Server
      </button>

      {isOpen && (
        <>
          {ReactDOM.createPortal(
            <Form />,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
    </>
  );
}

export default Server;
