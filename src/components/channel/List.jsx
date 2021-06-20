import React, { useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import ChannelModal from "../modals/server/Channel";
import useSection from "../../hooks/realtime/useSection";

function List({ serverId, categoryId }) {
  const { sections: channels } = useSection(
    `${process.env.REACT_APP_URL}/categories/${categoryId}/channels`,
    "channel",
    categoryId
  );

  return (
    <ul>
      {channels.map((channel) => (
        <Channel
          key={channel._id}
          serverId={serverId}
          categoryId={categoryId}
          channel={channel}
        />
      ))}
    </ul>
  );
}

function Channel({ serverId, categoryId, channel }) {
  const [hovered, setHovered] = useState(false);
  const current =
    useRouteMatch("/servers/:serverId/channels/:channelId") &&
    useRouteMatch("/servers/:serverId/channels/:channelId").params.channelId;

  function remove(id) {
    fetch(`${process.env.REACT_APP_URL}/channels/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }

  return (
    <Li
      key={channel._id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $current={current === channel._id}
    >
      <Link to={`/servers/${serverId}/channels/${channel._id}`}>
        # {channel.name}
      </Link>
      {hovered && (
        <ChannelModal
          serverId={serverId}
          categoryId={categoryId}
          channel={channel}
        />
      )}
      {/* <button type="button" onClick={() => remove(channel._id)}>
            Delete
          </button> */}
    </Li>
  );
}

export default List;

List.propTypes = {
  serverId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};

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
  padding: 0.15rem 0 0.15rem 1.5rem;
  font-weight: ${(props) => props.$current && 400};

  & > *:first-child {
    flex: 1;
  }
`;
