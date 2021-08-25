import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useServer from "../../hooks/server/server/useServer";

function About({ serverId }) {
  const { server } = useServer(serverId);

  if (!server) return <></>;

  return (
    <Container>
      {server.icon ? (
        <Icon
          src={`data:${server.icon.type};base64,${Buffer.from(
            server.icon.thumbnail || server.icon.data
          ).toString("base64")}`}
          alt={server.name}
        />
      ) : (
        <Default>{server.name[0]}</Default>
      )}
      <Heading>{server.name}</Heading>
      <Description>{server.about}</Description>
    </Container>
  );
}

export default About;

About.propTypes = {
  serverId: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  @media all and (min-width: 768px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const Heading = styled.h2`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  margin: 1rem 0;
  font-weight: 300;
`;

const Description = styled.p`
  display: none;
  color: ${(props) => props.theme.text_secondary};
  font-size: 0.875rem;

  @media all and (min-width: 768px) {
    display: block;
  }
`;

const icon = `
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  border-radius: 50%;

  @media all and (min-width: 768px) {
    width: 5rem;
    height: 5rem;
    margin-right: 0;
  }
`;

const Icon = styled.img`
  ${icon};
  object-fit: cover;
`;

const Default = styled.div`
  ${icon};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;
