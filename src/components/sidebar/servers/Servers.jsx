import React from "react";
import styled from "styled-components";
import useFetch from "../../../hooks/shared/useFetch";
import Server from "./Server";

function Servers() {
  const { data: servers } = useFetch(
    `${process.env.REACT_APP_URL}/users/${
      JSON.parse(localStorage.getItem("user"))._id
    }/servers`
  );

  return (
    <Ul>{servers && servers.map((server) => <Server server={server} />)}</Ul>
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
