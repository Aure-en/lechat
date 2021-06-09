import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import Form from "../channel/Form";

function Channel({ serverId, categoryId }) {
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Create Channel
      </button>

      {isOpen && (
        <>
          {ReactDOM.createPortal(
            <Form serverId={serverId} categoryId={categoryId} />,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
    </>
  );
}

export default Channel;

Channel.propTypes = {
  serverId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};
