import React from "react";
import PropTypes from "prop-types";
import useSection from "../../hooks/useSection";
import Channels from "../channel/List";
import ChannelModal from "../modals/server/Channel";
import CategoryModal from "../modals/server/Category";

function List({ serverId }) {
  const { sections: categories } = useSection(
    `${process.env.REACT_APP_URL}/servers/${serverId}/categories`,
    "category"
  );

  const remove = (id) => {
    fetch(`${process.env.REACT_APP_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  };

  return (
    <ul>
      {categories.map((category) => (
        <li key={category._id}>
          {category.name}
          <Channels serverId={serverId} categoryId={category._id} />
          <ChannelModal serverId={serverId} categoryId={category._id} />
          <CategoryModal serverId={serverId} category={category} />
          <button type="button" onClick={() => remove(category._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default List;

List.propTypes = {
  serverId: PropTypes.string.isRequired,
};
