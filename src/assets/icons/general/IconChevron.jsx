import React from "react";
import PropTypes from "prop-types";

function IconChevron({ size, strokeWidth }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-chevron-down"
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default IconChevron;

IconChevron.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};

IconChevron.defaultProps = {
  size: 16,
  strokeWidth: 1,
};
