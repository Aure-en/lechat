import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Ordered({ id, depth, children }) {
  return (
    <Ol $depth={depth}>
      {children.map((child, index) => (
        <Li key={id[index]}>{child}</Li>
      ))}
    </Ol>
  );
}

export default Ordered;

const Ol = styled.ol`
  list-style: ${(props) => {
    if (props.$depth % 3 === 0) return "decimal";
    if (props.$depth % 3 === 1) return "lower-latin";
    return "lower-roman";
  }};
  padding-inline-start: 1.5rem;
`;

const Li = styled.li`
  padding-left: 0.5rem;
`;

Ordered.propTypes = {
  id: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
