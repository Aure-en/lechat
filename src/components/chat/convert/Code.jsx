import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Code({ children }) {
  return <Container>{children}</Container>;
}

export default Code;

const Container = styled.div`
  background: ${(props) => props.theme.bg_code};
  padding: 0.5rem;
  margin: 1rem;
  font-family: "Monospace";
  font-size: 0.875rem;
  white-space: pre;
`;

Code.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
