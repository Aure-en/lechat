import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import ChannelModal from "../modals/Channel";

function List({ serverId, categoryId }) {
  const { data: channels } = useFetch(
    `${process.env.REACT_APP_URL}/categories/${categoryId}/channels`
  );

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
            <Link to={`/servers/${serverId}/channels/${channel._id}`}>
              {channel.name}
            </Link>
            <ChannelModal
              serverId={serverId}
              categoryId={categoryId}
              channel={channel}
            />
            <button type="button" onClick={() => remove(channel._id)}>Delete</button>
          </li>
        ))}
    </ul>
  );
}

export default List;

List.propTypes = {
  serverId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};
