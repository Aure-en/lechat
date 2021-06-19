import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/shared/useFetch";

function Server() {
  const { data: servers } = useFetch(
    `${process.env.REACT_APP_URL}/users/${
      JSON.parse(localStorage.getItem("user"))._id
    }/servers`
  );

  return (
    <Ul>
      {servers &&
        servers.map((server) => (
          <li key={server._id}>
            <Link to={`/servers/${server._id}`}>
              {server.icon ? (
                <Icon
                  src={`data:${server.icon.contentType};base64,${Buffer.from(
                    server.icon.data
                  ).toString("base64")}`}
                  alt={server.name}
                />
              ) : (
                <Default>{server.name[0]}</Default>
              )}
            </Link>
          </li>
        ))}
    </Ul>
  );
}

export default Server;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  & > li {
    margin-bottom: 0.5rem;
  }
`;

const Icon = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${(props) => props.theme.server_icon_bg};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;
