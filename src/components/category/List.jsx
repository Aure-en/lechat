import React from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import Channels from "../channel/List";
import ChannelForm from "../channel/Form";

function List({ serverId }) {
  const { data: categories } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${serverId}/categories`
  );

  return (
    <ul>
      {categories &&
        categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <Channels categoryId={category._id} />
            <ChannelForm categoryId={category._id} />
          </li>
        ))}
    </ul>
  );
}

export default List;

List.propTypes = {
  serverId: PropTypes.string.isRequired,
};
