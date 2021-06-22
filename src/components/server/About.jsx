import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../../hooks/shared/useFetch";

function About({ serverId }) {
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${serverId}`
  );

  if (!server) return <></>;

  return (
    <Container>
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
      <Heading>{server.name}</Heading>
      <Description>
        {server.about}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quos
        deserunt voluptatibus labore sit.
      </Description>
    </Container>
  );
}

export default About;

About.propTypes = {
  serverId: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Heading = styled.h2`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  text-transform: uppercase;
  margin: 1rem 0;
  font-weight: 300;
`;

const Description = styled.p`
  color: ${(props) => props.theme.text_secondary};
  font-size: 0.875rem;
`;

const Icon = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;
