import React from "react";
import styled from "styled-components";

function IconLoad() {
  return (
    <Svg
      version="1.1"
      id="L4"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <Circle stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </Circle>
      <Circle stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </Circle>
      <Circle stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </Circle>
    </Svg>
  );
}

// To fit properly in a message grid.
const Svg = styled.svg`
  grid-column: 2;
`;

const Circle = styled.circle`
  fill: ${(props) => props.theme.bg_sidebar};
`;

export default IconLoad;
