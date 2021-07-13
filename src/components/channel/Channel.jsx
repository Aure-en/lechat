import React, { useRef } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Menu from "./Menu";

function Channel({ serverId, categoryId, channel }) {
  // To know if the channel is currently active.
  const current =
    useRouteMatch("/servers/:serverId/channels/:channelId") &&
    useRouteMatch("/servers/:serverId/channels/:channelId").params.channelId;

  // For contextual menu
  const ref = useRef();

  return (
    <Li key={channel._id} $current={current === channel._id} ref={ref}>
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
  font-weight: ${(props) => props.$current && 400};

  & > *:first-child {
    flex: 1;
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
