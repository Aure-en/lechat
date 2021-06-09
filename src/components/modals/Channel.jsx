import React from "react";
import ReactDOM from "react-dom";
import useModal from "../../hooks/useModal";
import Form from "../channel/Form";

function Channel() {
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Create Channel
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

export default Channel;
