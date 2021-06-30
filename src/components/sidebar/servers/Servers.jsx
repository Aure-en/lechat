import React from "react";
import styled from "styled-components";
import useServers from "../../../hooks/realtime/server/useServers";
import Server from "./Server";

function Servers() {
  const { servers } = useServers();

  return (
    <Ul>
      {servers.map((server) => (
        <Server server={server} />
      ))}
    </Ul>
  );
}

export default Servers;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  & > li {
    margin-bottom: 0.5rem;
  }
`;
