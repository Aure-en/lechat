import React from "react";
import styled from "styled-components";
import useFetch from "../../hooks/shared/useFetch";
import { useAuth } from "../../context/AuthContext";
import Preview from "./Preview";

function List() {
  const { user } = useAuth();
  const { data } = useFetch(`${process.env.REACT_APP_SERVER}/users/${user._id}`);

  return (
    <Ul>
      {data &&
        data.server.map((server) => (
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

  @media all and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media all and (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
