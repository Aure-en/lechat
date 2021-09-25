import React, { forwardRef } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import useServers from "../../../hooks/server/server/useServers";
import Create from "../../server/Modal";
import Explore from "./Explore";
import List from "./List";
import IconLoad from "../../../assets/icons/general/IconLoad";

const Servers = forwardRef(({}, ref) => {
  const { loading, servers } = useServers();

  return (
    <Container ref={ref}>
      {loading ? (
        <IconLoad />
      ) : (
        <Ul>
          <List servers={servers} />
        </Ul>
      )}

      <ReactTooltip id="nav-servers" effect="solid" place="right" />
      <Bottom>
        <Create />
        <Explore />
      </Bottom>
    </Container>
  );
});

export default Servers;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  position: absolute;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-left: none;
  top: 1rem;
  bottom: 0;
  left: calc(100% - 1rem);
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 0 1rem 1rem 0;
  border-left: 1rem solid ${(props) => props.theme.bg_secondary};
  color: ${(props) => props.theme.text_tertiary};
  min-width: 5rem;
  padding: 0.75rem 0;
  height: calc(100% - 2rem);
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;

  & li {
    position: relative;
    margin-bottom: 0.5rem;
  }

  & li:hover:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: -0.5rem;
    border: 7px solid transparent;
    border-left: 7px solid ${(props) => props.theme.bg_sidebar};
    transform: translateY(-50%);
    opacity: 0.5;
  }

  &::-webkit-scrollbar {
    width: 0.3rem;
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

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
