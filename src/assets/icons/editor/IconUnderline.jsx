import React from "react";
import PropTypes from "prop-types";

function IconUnderline({ strokeWidth }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-underline"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 5v5a5 5 0 0 0 10 0v-5" />
      <path d="M5 19h14" />
    </svg>
  );
}

export default IconUnderline;

IconUnderline.propTypes = {
  strokeWidth: PropTypes.number,
};

IconUnderline.defaultProps = {
  strokeWidth: 0.75,
};
