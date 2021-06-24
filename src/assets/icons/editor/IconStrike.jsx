import React from "react";
import PropTypes from "prop-types";

function IconStrike({ strokeWidth }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-strikethrough"
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
      <path d="M7 5v9a5 5 0 0 0 10 0v-9" />
      <path d="M4 12h16" />
    </svg>
  );
}

export default IconStrike;

IconStrike.propTypes = {
  strokeWidth: PropTypes.number,
};

IconStrike.defaultProps = {
  strokeWidth: 0.75,
};
