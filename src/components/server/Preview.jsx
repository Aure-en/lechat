import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Preview({ server }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/servers/${server._id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Container>
        <Banner $banner={server.icon} $hovered={hovered}>
          <div />
        </Banner>
        {server.icon ? (
          <Icon
            src={`data:${server.icon.contentType};base64,${Buffer.from(
              server.icon.data
            ).toString("base64")}`}
            alt={server.name}
          />
        ) : (
          <Default as="div">{server.name[0]}</Default>
        )}
        <Content>
          <Heading>{server.name}</Heading>
          <Description>
            {server.about}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quos
            deserunt voluptatibus labore sit.
          </Description>
        </Content>
      </Container>
    </Link>
  );
}

export default Preview;

Preview.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
    _id: PropTypes.string,
    icon: PropTypes.shape({
      contentType: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }).isRequired,
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-radius: 1rem;
  overflow: hidden;
`;

const Banner = styled.div`
  width: 100%;
  height: 6rem;
  border-radius: 1rem 1rem 0 0;
  margin-bottom: 2rem;
  overflow: hidden;

  & > div {
    width: 100%;
    height: 100%;
    background: ${(props) =>
      props.$banner &&
      `url(data:${props.$banner.contentType};base64,${Buffer.from(
        props.$banner.data
      ).toString("base64")})`};
    border-bottom: 2px solid ${(props) => props.theme.bg_chat};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transform: ${(props) => props.$hovered && "scale(1.1)"};
    transition: transform 0.3s linear;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 2rem 2rem;
`;

const Heading = styled.h2`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  margin: 1rem 0;
  font-weight: 300;
  text-align: center;
`;

const Description = styled.p`
  color: ${(props) => props.theme.text_secondary};
  font-size: 0.875rem;
`;

const Icon = styled.img`
  position: absolute;
  display: inline-block;
  top: 3rem; // Half of banner height
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.bg_chat};
  object-fit: cover;
`;

const Default = styled(Icon)`
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;

const Button = styled.div`
  align-self: flex-end;
`;
