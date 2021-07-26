import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Members from "../Members";

function Right({ serverId }) {
  return (
    <Container>
      <Members serverId={serverId} />
    </Container>
  );
}

export default Right;

Right.propTypes = {
  serverId: PropTypes.string.isRequired,
};

const Container = styled.div`
  padding: 2rem 2rem 2rem 1rem;
  width: 17.5rem;
`;
