import React from "react";
import PropTypes from "prop-types";
import Categories from "../components/category/List";
import CategoryModal from "../components/modals/Category";

function Server({ match }) {
  return (
    <>
      <Categories serverId={match.params.serverId} />
      <CategoryModal serverId={match.params.serverId} />
    </>
  );
}

export default Server;

Server.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string,
    }),
  }).isRequired,
};
