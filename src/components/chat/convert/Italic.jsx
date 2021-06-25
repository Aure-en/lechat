import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Italic({ children }) {
  return <Container>{children}</Container>;
}

export default Italic;

const Container = styled.span`
  font-style: italic;
`;

Italic.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
