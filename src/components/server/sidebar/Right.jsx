import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Members from "../Members";
import useWindowSize from "../../../hooks/shared/useWindowSize";
import IconClose from "../../../assets/icons/general/IconClose";

function Right({ serverId, close }) {
  const { windowSize } = useWindowSize();

  return (
    <Container>
      <Members serverId={serverId} />
      {windowSize.width < 768 && (
        <Button type="button" onClick={close}>
          <IconClose size="30" strokeWidth="1" />
        </Button>
      )}
    </Container>
  );
}

export default Right;

Right.propTypes = {
  serverId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

const Container = styled.div`
  position: absolute;
  right: 0;
  background: ${(props) => props.theme.bg_primary};
  z-index: 5;
  display: grid;
  grid-template-rows: 1fr min-content;
  height: 100%;
  border-radius: 1rem 0 0 1rem;
  border-left: 1px solid ${(props) => props.theme.bg_sidebar};

  @media all and (min-width: 768px) {
    position: relative;
    right: initial;
    max-height: 100vh;
    border-left: 0;
  }
`;

const Button = styled.button`
  color: ${(props) => props.theme.bg_sidebar};
  justify-self: end;
`;
