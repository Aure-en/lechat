import React from "react";
import ReactDOM from "react-dom";
import useModal from "../../hooks/useModal";
import Form from "../category/Form";

function Category({ serverId }) {
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Create Category
      </button>

      {isOpen && (
        <>
          {ReactDOM.createPortal(
            <Form serverId={serverId} />,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
    </>
  );
}

export default Category;
