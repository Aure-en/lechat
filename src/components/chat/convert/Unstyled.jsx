import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Unstyled({ children }) {
  return <Container>{children}</Container>;
}

export default Unstyled;

const Container = styled.div`
  min-height: 1.5rem;
`;

Unstyled.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
