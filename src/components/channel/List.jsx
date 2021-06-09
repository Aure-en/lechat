import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

function List({ serverId, categoryId }) {
  const { data: channels } = useFetch(
    `${process.env.REACT_APP_URL}/categories/${categoryId}/channels`
  );

  return (
    <ul>
      {channels &&
        channels.map((channel) => (
          <li key={channel._id}>
            <Link to={`/servers/${serverId}/channels/${channel._id}`}>
              {channel.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default List;

List.propTypes = {
  categoryId: PropTypes.string.isRequired,
};
