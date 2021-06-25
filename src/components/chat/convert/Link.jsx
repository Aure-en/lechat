import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Link({ href, children }) {
  return <Container href={href}>{children}</Container>;
}

export default Link;

const Container = styled.a`
  color: ${(props) => props.theme.text_link};

  &:hover {
    color: ${(props) => props.theme.text_link_hover};
    text-decoration: underline;
  }
`;

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
