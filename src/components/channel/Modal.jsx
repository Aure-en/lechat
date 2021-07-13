import React from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import Modal from "../shared/Modal";

function Channel({ isOpen, setIsOpen, serverId, categoryId, channel }) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form serverId={serverId} categoryId={categoryId} channel={channel} />
    </Modal>
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
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.bool.isRequired,
};

Channel.defaultProps = {
  channel: undefined,
};
