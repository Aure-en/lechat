import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ChannelModal from "../modals/Channel";

function List({ channels }) {
  const remove = (id) => {
    fetch(`${process.env.REACT_APP_URL}/channels/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  };

  return (
    <ul>
      {channels &&
        channels.map((channel) => (
          <li key={channel._id}>
            <Link to={`/servers/${channel.server}/channels/${channel._id}`}>
              {channel.name}
            </Link>
            <ChannelModal
              serverId={channel.server}
              categoryId={channel.category}
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
