import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ChannelModal from "../modals/server/Channel";
import useSection from "../../hooks/useSection";

function List({ serverId, categoryId }) {
  const { sections: channels } = useSection(
    `${process.env.REACT_APP_URL}/categories/${categoryId}/channels`,
    "channel",
    categoryId
  );

  function remove(id) {
    fetch(`${process.env.REACT_APP_URL}/channels/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }

  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel._id}>
          <Link to={`/servers/${serverId}/channels/${channel._id}`}>
            {channel.name}
          </Link>
          <ChannelModal
            serverId={serverId}
            categoryId={categoryId}
            channel={channel}
          />
          <button type="button" onClick={() => remove(channel._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default List;

List.propTypes = {
  channels: PropTypes.array.isRequired,
};
