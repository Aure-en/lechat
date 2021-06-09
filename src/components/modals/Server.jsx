import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import Create from "../server/Form";

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
