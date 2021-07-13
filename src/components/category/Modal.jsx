import React from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import Modal from "../shared/Modal";

function Category({ isOpen, setIsOpen, serverId, category }) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form serverId={serverId} category={category} />
    </Modal>
  );
}

export default Category;

Category.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  serverId: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Category.defaultProps = {
  category: undefined,
};
