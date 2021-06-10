import React from "react";
import PropTypes from "prop-types";
import Categories from "../../components/category/List";
import CategoryModal from "../../components/modals/Category";
import Channel from "./Channel";
import useFetch from "../../hooks/useFetch";

function Server({ match }) {
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${match.params.serverId}`
  );

  return (
    <>
      {/* Left sidebar */}
      <Categories serverId={match.params.serverId} />
      <CategoryModal serverId={match.params.serverId} />

      {/* Main */}
      <div>
        {server && server.name}
        {match.params.channelId && (
          <Channel channelId={match.params.channelId} />
        )}
      </div>

      {/* Right sidebar */}
    </>
  );
}

export default Server;

Server.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string,
      channelId: PropTypes.string,
    }),
  }).isRequired,
};
