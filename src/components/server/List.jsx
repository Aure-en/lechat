import React from "react";
import styled from "styled-components";
import useServers from "../../hooks/server/server/useServers";
import Preview from "./Preview";

function List() {
  const { servers } = useServers();

  return (
    <Ul>
      {servers &&
        servers.map((server) => (
          <li key={server._id}>
            <Preview server={server} join={false} />
          </li>
        ))}
    </Ul>
  );
}

export default List;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 2rem;

  @media all and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media all and (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
