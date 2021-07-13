import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../shared/buttons/Border";
import Modal from "../shared/Modal";

function Setting({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Edit</Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {React.cloneElement(children, { setIsOpen })}
      </Modal>
    </>
  );
}

export default Setting;

Setting.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
