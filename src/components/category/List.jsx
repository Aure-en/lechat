import React from "react";
import PropTypes from "prop-types";
import useSection from "../../hooks/useSection";
import useTest from "../../hooks/useTest";
import Channels from "../channel/List";
import ChannelModal from "../modals/Channel";
import CategoryModal from "../modals/Category";

function List({ serverId }) {
  const { sections: categories } = useTest(
    `${process.env.REACT_APP_URL}/servers/${serverId}/categories`,
    "CATEGORY LIST",
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
      {categories &&
        categories.map((category) => (
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
