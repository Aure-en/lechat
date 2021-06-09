import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import Form from "../channel/Form";

function Channel({ serverId, categoryId, channel }) {
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        {channel ? "Update" : "Create"} Channel
      </button>

      {isOpen && (
        <>
          {ReactDOM.createPortal(
            <Form
              serverId={serverId}
              categoryId={categoryId}
              channel={channel}
            />,
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
  channel: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Channel.defaultProps = {
  channel: undefined,
};
