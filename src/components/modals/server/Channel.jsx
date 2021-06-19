import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "../../channel/Form";
import Modal from "../Modal";

function Channel({ serverId, categoryId, channel }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        {channel ? "Update" : "Create"} Channel
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form serverId={serverId} categoryId={categoryId} channel={channel} />
      </Modal>
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
