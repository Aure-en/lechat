import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu";
import { useUnread } from "../../../context/UnreadContext";

function Server({ server }) {
  // Different display if server contains unread messages.
  const [hasUnread, setHasUnread] = useState(false);
  const { unread } = useUnread();
  const ref = useRef();

  // Check if the server has any unread messages.
  useEffect(() => {
    if (!unread) return;
    const unreadServer = unread.servers.find((serv) => serv._id === server._id);

    if (!unreadServer) return;

    // Returns true if there are any channels with unread messages.
    const hasUnread = unreadServer.channels.some(
      (channel) => channel.unread > 0
    );
    setHasUnread(hasUnread);
  }, [unread]);

  return (
    <>
      <Li key={server._id}>
        <Link
          to={`/servers/${server._id}`}
          ref={ref}
          data-tip={server.name}
          data-offset={`{${server.icon ? "'top': 16, " : ""}'right': -10}`}
          data-for="nav-servers"
        >
          {server.icon ? (
            <Icon
              src={`data:${server.icon.type};base64,${Buffer.from(
                server.icon.data
              ).toString("base64")}`}
              alt={server.name}
            />
          ) : (
            <Default>{server.name[0]}</Default>
          )}
          {hasUnread && <Dot aria-label="unread" />}
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
      type: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }).isRequired,
};

const Li = styled.li`
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.text_primary};
  font-size: 1.5rem;
  border-radius: 50%;
`;

const Dot = styled.span`
  display: inline-block;
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  background: ${(props) => props.theme.bg_primary};
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-radius: 50%;
  bottom: 1px;
  right: 1px;
`;
