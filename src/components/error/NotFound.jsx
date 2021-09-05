import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Wrapper>
      <Container>
        <Heading>Are you lost?</Heading>
        <p>
          There is nothing here. The place you are looking for might have been
          deleted, or you do not have permission to be here.
        </p>
        {/* &#8592; = ← */}
        <Link to="/">&#8592; Take a step back</Link>
      </Container>
    </Wrapper>
  );
}

export default NotFound;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 1rem;
  height: 100vh; // margin-top
  min-height: -webkit-fill-available;
  overflow: hidden;
  flex: 1;

  @media all and (min-width: 768px) {
    margin: 1rem 1rem 0 0;
    height: calc(100vh - 1rem); // margin-top
    border-radius: 1rem 1rem 0 0;
  }
`;

const Container = styled.div`
  max-width: 30rem;
  text-align: center;
  color: ${(props) => props.theme.text_secondary};

  & > a {
    position: relative;
    left: -0.35rem;
    display: inline-block;
    margin-top: 0.5rem;
    color: ${(props) => props.theme.text_tertiary};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Heading = styled.h3`
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.text_primary};
`;
