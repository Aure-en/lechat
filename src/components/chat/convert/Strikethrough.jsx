import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Strikethrough({ children }) {
  return <Container>{children}</Container>;
}

export default Strikethrough;

const Container = styled.span`
  text-decoration: line-through;
`;

Strikethrough.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
