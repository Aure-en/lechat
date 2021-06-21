import React from "react";
import PropTypes from "prop-types";

function IconPlus({ size, strokeWidth }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-plus"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default IconPlus;

IconPlus.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};

IconPlus.defaultProps = {
  size: 16,
  strokeWidth: 1,
};
