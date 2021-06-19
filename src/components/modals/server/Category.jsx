import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "../../category/Form";
import Modal from "../Modal";

function Category({ serverId, category }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        {category ? "Update" : "Create"} Category
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form serverId={serverId} category={category} />
      </Modal>
    </>
  );
}

export default Category;

Category.propTypes = {
  serverId: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Category.defaultProps = {
  category: undefined,
};
