import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Underline({ children }) {
  return <Container>{children}</Container>;
}

export default Underline;

const Container = styled.span`
  text-decoration: underline;
`;

Underline.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
