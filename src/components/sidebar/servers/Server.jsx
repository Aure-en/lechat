import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../../contextual/Server";

function Server({ server }) {
  const ref = useRef();

  return (
    <>
      <Li key={server._id}>
        <Link
          to={`/servers/${server._id}`}
          ref={ref}
          data-tip={server.name}
          data-offset="{'top': 16, 'right': 4}"
        >
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
      </Li>

      <Menu server={server} outerRef={ref} />
    </>
  );
}

export default Server;

Server.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
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

const Li = styled.li`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;

  &:hover img {
    transform: scale(1.05);
    filter: blur(0);
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s linear;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;
