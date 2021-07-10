import React from "react";
import styled from "styled-components";

function Compass() {
  return (
    <Container>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-brand-safari"
        width="38"
        height="38"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <circle cx="12" cy="12" r="9" />
        <polyline points="8 16 10 10 16 8 14 14 8 16" />
      </svg>
    </Container>
  );
}

export default Compass;

const Container = styled.span`
  opacity: 0.5; // Adjust color
`;
