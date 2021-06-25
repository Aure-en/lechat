import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Bold({ children }) {
  return <Container>{children}</Container>;
}

export default Bold;

const Container = styled.span`
  font-weight: 500;
`;

Bold.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
