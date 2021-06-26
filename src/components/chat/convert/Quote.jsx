import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Code({ children }) {
  return <Container>{children}</Container>;
}

export default Code;

const Container = styled.div`
  position: relative;
  margin: 1rem 0 1rem 1rem;
  white-space: pre;

  &:before {
    position: absolute;
    content: "";
    border: 2px solid ${({ theme }) => theme.border_quote};
    border-radius: 15%;
    left: -0.75rem;
    height: 100%;
  }
`;

Code.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
