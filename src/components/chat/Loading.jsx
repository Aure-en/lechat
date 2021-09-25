import React from "react";
import styled from "styled-components";
import IconLoad from "../../assets/icons/general/IconLoad";

function Loading() {
  return (
    <Container>
      <IconLoad />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
