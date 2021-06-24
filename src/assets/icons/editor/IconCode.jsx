import React from "react";
import PropTypes from "prop-types";

function IconCode({ strokeWidth }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-code"
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
      <polyline points="7 8 3 12 7 16" />
      <polyline points="17 8 21 12 17 16" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}

export default IconCode;

IconCode.propTypes = {
  strokeWidth: PropTypes.number,
};

IconCode.defaultProps = {
  strokeWidth: 0.75,
};
