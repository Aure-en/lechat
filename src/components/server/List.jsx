import React from "react";
import styled from "styled-components";
import useFetch from "../../hooks/shared/useFetch";
import { useAuth } from "../../context/AuthContext";
import Preview from "./Preview";

function List() {
  const { user } = useAuth();
  const { data } = useFetch(`${process.env.REACT_APP_URL}/users/${user._id}`);

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
  grid-template-columns: repeat(3, 1fr);
`;
