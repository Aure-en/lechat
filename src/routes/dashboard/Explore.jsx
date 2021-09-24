import React from "react";
import useSWR from "swr";
import styled from "styled-components";
import Preview from "../../components/server/Preview";
import { useAuth } from "../../context/AuthContext";
import IconLoad from "../../assets/icons/general/IconLoad";

function Explore() {
  const { user } = useAuth();
  const { data: servers, loading } = useSWR(
    `${process.env.REACT_APP_SERVER}/servers?sort_by=members&order=desc&limit=5`
  );

  return (
    <Container>
      <Heading>Featured Servers</Heading>

      {loading ? (
        <IconLoad />
      ) : (
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
      )}
    </Container>
  );
}

export default Explore;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.bg_secondary};
  padding: 3rem;
  border-radius: 1rem;
  height: 100vh;
  min-height: -webkit-fill-available;
  overflow: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 0.5rem 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }

  @media all and (min-width: 768px) {
    margin: 1rem 1rem 0 1rem;
    height: calc(100vh - 1rem); // margin-top
    border-radius: 1rem 1rem 0 0;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;

  @media all and (min-width: 768px) {
    text-align: left;
  }
`;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15.625rem, 1fr)); // 250px;
  grid-gap: 2rem;
  grid-auto-rows: 1fr; // Equal height.
`;
