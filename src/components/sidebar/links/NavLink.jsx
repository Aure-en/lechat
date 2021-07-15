import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavLink({ to, tip, offset, children }) {
  return (
    <Link
      to={to}
      data-tip={tip}
      data-for={offset ? "nav" : "nav-servers"}
      data-offset={offset && "{'top': 16, 'right': -15}"}
    >
      {children}
    </Link>
  );
}

export default NavLink;

NavLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  to: PropTypes.string.isRequired,
  tip: PropTypes.string.isRequired,
  offset: PropTypes.bool,
};

NavLink.defaultProps = {
  offset: true,
};
