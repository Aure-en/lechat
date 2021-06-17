import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ChannelModal from "../modals/Channel";
import useTest from "../../hooks/useTest";

function List({ serverId, categoryId }) {
  const { sections: channels } = useTest(
    `${process.env.REACT_APP_URL}/categories/${categoryId}/channels`,
    `CHANNEL FROM ${categoryId}`,
    "channel",
    categoryId
  );

  useTest(`CHANNEL FROM ${categoryId}`, "channel", categoryId);

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
      {channels &&
        channels.map((channel) => (
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
