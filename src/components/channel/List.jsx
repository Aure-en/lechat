import React from "react";
import PropTypes from "prop-types";
import useSection from "../../hooks/server/server/useSection";
import Channel from "./Channel";

// List all the channels in a server category.
function List({ serverId, categoryId }) {
  const { sections: channels } = useSection(
    `${process.env.REACT_APP_SERVER}/categories/${categoryId}/channels`,
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

export default List;

List.propTypes = {
  serverId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};