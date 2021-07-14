import React, { useRef } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Server from "./Server";
import useDropdown from "../../../hooks/shared/useDropdown";
import useServers from "../../../hooks/server/server/useServers";
import Create from "../../server/Modal";
import Explore from "./Explore";
import { ReactComponent as IconServers } from "../../../assets/icons/nav/grid.svg";

function Servers() {
  const ref = useRef(); // For dropdown
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);
  const { servers } = useServers();
  return (
    <div ref={ref}>
      <Button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        data-tip="Servers"
        data-for="nav"
        data-offset={"{'top': 16, 'right': -15}"}
      >
        <IconServers />
      </Button>
      {isDropdownOpen && (
        <Container>
          <Ul>
            {servers.map((server) => (
              <Server server={server} key={server._id} />
            ))}
          </Ul>

          <ReactTooltip id="nav-servers" effect="solid" place="right" />
          <Bottom>
            <Create />
            <Explore />
          </Bottom>
        </Container>
      )}
    </div>
  );
}

export default Servers;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  position: absolute;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-left: none;
  top: 0;
  bottom: 0;
  left: calc(100% - 1rem);
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 0 1rem 1rem 0;
  border-left: 1rem solid ${(props) => props.theme.bg_secondary};
  color: ${(props) => props.theme.text_tertiary};
  min-width: 5rem;
  padding: 0.75rem 0;

  // Put the panel under the sidebar
  transform: translateZ(-10px);
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
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
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

const Button = styled.button`
  position: relative;

  &:hover:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: calc(-1rem - 1px);
    border: 8px solid transparent;
    border-left: 8px solid ${(props) => props.theme.sidebar_button};
    transform: translateY(-50%);
  }
`;
