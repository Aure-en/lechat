import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import Form from "../category/Form";

function Category({ serverId, category }) {
  const { isOpen, setIsOpen } = useModal();
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        {category ? "Update" : "Create"} Category
      </button>

      {isOpen && (
        <>
          {ReactDOM.createPortal(
            <Form serverId={serverId} category={category} />,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
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
