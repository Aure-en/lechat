import React, { useState, useEffect, useRef } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useUnread } from "../../context/UnreadContext";
import Menu from "./Menu";

function Channel({ serverId, categoryId, channel }) {
  // Different display if channel contains unread message.
  const [hasUnread, setHasUnread] = useState(false);
  const { unread } = useUnread();

  // To know if the channel is currently active.
  const current =
    useRouteMatch("/servers/:serverId/channels/:channelId") &&
    useRouteMatch("/servers/:serverId/channels/:channelId").params.channelId;

  // For contextual menu
  const ref = useRef();

  useEffect(() => {
    if (!unread) return;
    const unreadServer = unread.servers.find(
      (server) => server._id === serverId
    );

    if (!unreadServer) return;
    const unreadChannel = unreadServer.channels.find(
      (chan) => chan._id === channel._id
    );

    if (!unreadChannel) return;
    setHasUnread(unreadChannel.unread > 0);
  }, [unread]);

  return (
    <Li
      key={channel._id}
      $current={current === channel._id}
      $unread={hasUnread}
      ref={ref}
    >
      <StyledLink to={`/servers/${serverId}/channels/${channel._id}`}>
        {channel.name}
      </StyledLink>
      <Menu
        serverId={serverId}
        channel={channel}
        categoryId={categoryId}
        outerRef={ref}
      />
    </Li>
  );
}

export default Channel;

Channel.propTypes = {
  serverId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  channel: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  border-radius: 3px;
  background: ${(props) => props.$current && props.theme.bg_active};
  font-weight: ${(props) => props.$unread && 400};
  margin-bottom: 0.15rem;

  & > *:first-child {
    flex: 1;
  }

  &:hover {
    background: ${(props) => !props.$current && props.theme.bg_hover};
  }
`;

const StyledLink = styled(Link)`
  text-indent: 2rem;

  &:before {
    content: "";
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background: ${(props) => props.theme.bg_button};
    transform: rotate(45deg);
    margin-right: 1rem;
  }
`;
