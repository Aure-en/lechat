import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import About from "../About";
import Categories from "../../category/List";

function Left({ serverId }) {
  return (
    <Container>
      <About serverId={serverId} />
      <Categories serverId={serverId} />
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
