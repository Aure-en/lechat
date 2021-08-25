import React from "react";
import styled from "styled-components";

function NoPins() {
  return (
    <Container>
      <Heading>No pins</Heading>
      <p>No one has pinned a message there yet.</p>
    </Container>
  );
}

export default NoPins;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h3`
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.text_primary};
`;
