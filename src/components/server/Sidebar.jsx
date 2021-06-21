import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import About from "./About";
import Categories from "../category/List";

function Sidebar({ serverId }) {
  return (
    <Container>
      <About serverId={serverId} />
      <Categories serverId={serverId} />
    </Container>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  serverId: PropTypes.string.isRequired,
};

const Container = styled.div`
  padding: 1rem;
`;
