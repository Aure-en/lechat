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
  padding: 1rem;
`;
