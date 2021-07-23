import React from "react";
import styled from "styled-components";
import Preview from "../../components/server/Preview";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/shared/useFetch";

function Explore() {
  const { user } = useAuth();
  const { data: servers } = useFetch(
    `${process.env.REACT_APP_URL}/servers?sort_by=members&order=desc`
  );

  return (
    <Container>
      <Heading>Featured Servers</Heading>

      <Ul>
        {servers &&
          servers.map((server) => (
            <li key={server._id}>
              <Preview
                server={server}
                join={!user.server.includes(server._id)}
              />
            </li>
          ))}
      </Ul>
    </Container>
  );
}

export default Explore;

const Container = styled.div`
  background: ${(props) => props.theme.bg_secondary};
  margin: 1rem 1rem 0 1rem;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1rem);
  padding: 3rem;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
`;
