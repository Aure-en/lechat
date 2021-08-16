import React from "react";
import styled from "styled-components";

function Empty() {
  return (
    <Wrapper>
      <Container>
        <Heading>No Channels</Heading>
        <p>
          You find yourself in a strange place. You don&apos;t have access to
          any channels, or there are none in this server.
        </p>
      </Container>
    </Wrapper>
  );
}

export default Empty;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  height: calc(100vh - 1rem);
  background: ${(props) => props.theme.bg_secondary};
  flex: 1;
`;

const Container = styled.div`
  max-width: 30rem;
  text-align: center;
  color: ${(props) => props.theme.text_secondary};
`;

const Heading = styled.h3`
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.text_primary};
`;
