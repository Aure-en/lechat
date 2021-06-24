import React from "react";
import PropTypes from "prop-types";

function IconItalic({ strokeWidth }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-italic"
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
      <line x1="11" y1="5" x2="17" y2="5" />
      <line x1="7" y1="19" x2="13" y2="19" />
      <line x1="14" y1="5" x2="10" y2="19" />
    </svg>
  );
}

export default IconItalic;

IconItalic.propTypes = {
  strokeWidth: PropTypes.number,
};

IconItalic.defaultProps = {
  strokeWidth: 0.75,
};