import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import About from "../About";
import Categories from "../../category/List";
import Menu from "./Menu";

function Left({ serverId }) {
  // For contextual menu
  const outerRef = useRef();
  const ignoreRef = useRef();

  return (
    <Container>
      <About serverId={serverId} />
      <div ref={outerRef}>
        <div ref={ignoreRef}>
          <Categories serverId={serverId} />
        </div>
      </div>
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
  height: 100%;
  z-index: 2;
  padding: 1rem;
  border-radius: 0 1rem 1rem 0;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-left: 0;
  width: 15rem;

  @media all and (min-width: 768px) {
    padding: 1rem 0 1rem 1rem;
    border-radius: 0;
    border: none;
    width: 17.5rem;
    padding: 1rem 2rem;
  }
`;
