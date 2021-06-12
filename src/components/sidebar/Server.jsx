import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

function Server() {
  const { data: servers, error } = useFetch(
    `${process.env.REACT_APP_URL}/users/${
      JSON.parse(localStorage.getItem("user"))._id
    }/servers`
  );

  return (
    <ul>
      {servers &&
        servers.map((server) => (
          <li key={server._id}>
            <Link to={`/servers/${server._id}`}>{server.name}</Link>
          </li>
        ))}
    </ul>
  );
}

export default Server;
