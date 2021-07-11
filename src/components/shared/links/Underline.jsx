import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Underline({ children, to, active }) {
  return (
    <Container to={to} $active={active}>
      {children}
    </Container>
  );
}

export default Underline;

Underline.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  active: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

Underline.defaultProps = {
  active: false,
};

const Container = styled(Link)`
  display: inline-block;
  margin: 0 1rem;
  padding: 0.5rem 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0.5rem; // Padding-bottom
    right: 0;
    width: ${(props) => (props.$active ? "100%" : "0")};
    height: 1px;
    background: linear-gradient(
      to right,
      ${(props) =>
        `${props.theme.bg_primary} 0%, ${props.theme.border_accent} 100%`}
    );
    transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;
