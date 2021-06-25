import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Unordered({ id, depth, children }) {
  return (
    <Ul $depth={depth}>
      {children.map((child, index) => (
        <li key={`${id}${index}`}>{child}</li>
      ))}
    </Ul>
  );
}

export default Unordered;

const Ul = styled.ul`
  list-style: ${(props) => {
    switch (props.$depth) {
      case 0:
        return "disc";
      case 1:
        return "circle";
      default:
        return "square";
    }
  }};
  padding-inline-start: 1.5rem;
`;

Unordered.propTypes = {
  id: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
