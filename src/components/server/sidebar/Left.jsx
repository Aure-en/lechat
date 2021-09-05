import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import About from "../About";
import Categories from "../../category/List";
import Menu from "./Menu";

/**
 * Server left panel.
 * Contains informations about the server and navigation.
 */
function Left({ serverId }) {
  // For contextual menu
  const outerRef = useRef();
  const ignoreRef = useRef();

  return (
    <Container>
      <About serverId={serverId} />
      <Content ref={outerRef}>
        <div ref={ignoreRef}>
          <Categories serverId={serverId} />
        </div>
      </Content>
      <Menu serverId={serverId} outerRef={outerRef} ignoreRef={ignoreRef} />
    </Container>
  );
}

export default Left;

Left.propTypes = {
  serverId: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: ${(props) => props.theme.bg_primary};
  height: 100vh;
  max-height: -webkit-fill-available;
  z-index: 2;
  padding: 1rem 0 1rem 1rem;
  border-radius: 0 1rem 1rem 0;
  border-right: 1px solid ${(props) => props.theme.bg_sidebar};
  width: 15rem;

  @media all and (min-width: 768px) {
    border-radius: 0;
    border: none;
    width: 17.5rem;
    padding: 1rem 0 1rem 2rem;
  }
`;

const Content = styled.div`
  overflow-y: auto;
  padding-right: 2rem;
  margin-right: 0.1rem;

  @media all and (min-width: 768px) {
    margin-right: 0.3rem;
  }

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 0.5rem 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }
`;
