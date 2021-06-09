import React from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import Channels from "../channel/List";
import ChannelModal from "../modals/Channel";
import CategoryModal from "../modals/Category";

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
            <Channels serverId={serverId} categoryId={category._id} />
            <ChannelModal serverId={serverId} categoryId={category._id} />
            <CategoryModal serverId={serverId} category={category} />
          </li>
        ))}
    </ul>
  );
}

export default List;

List.propTypes = {
  serverId: PropTypes.string.isRequired,
};
