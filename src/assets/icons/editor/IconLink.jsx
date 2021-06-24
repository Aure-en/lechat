import React from "react";
import PropTypes from "prop-types";

function IconLink({ strokeWidth }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-link"
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
      <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
      <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
    </svg>
  );
}

export default IconLink;

IconLink.propTypes = {
  strokeWidth: PropTypes.number,
};

IconLink.defaultProps = {
  strokeWidth: 0.75,
};
