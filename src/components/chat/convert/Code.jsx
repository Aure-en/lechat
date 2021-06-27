import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Code({ children }) {
  return <Container>{children}</Container>;
}

export default Code;

const Container = styled.div`
  background: ${(props) => props.theme.bg_code};
  padding: 0.5rem 1rem;
  margin: 1rem;
  font-family: "Monospace";
  font-size: 0.875rem;
  white-space: pre;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }
`;

Code.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
