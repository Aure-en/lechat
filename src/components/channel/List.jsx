import React from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

function List({ categoryId }) {
  const { data: channels } = useFetch(
    `${process.env.REACT_APP_URL}/categories/${categoryId}/channels`
  );

  return (
    <ul>
      {channels &&
        channels.map((channel) => <li key={channel._id}>{channel.name}</li>)}
    </ul>
  );
}

export default List;

List.propTypes = {
  categoryId: PropTypes.string.isRequired,
};
