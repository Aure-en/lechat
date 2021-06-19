import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import Categories from "../../components/category/List";
import CategoryModal from "../../components/modals/server/Category";
import Channel from "./Channel";
import About from "./About";
import useFetch from "../../hooks/useFetch";
import Members from "../../components/server/Members";
import Leave from "../../components/server/Leave";

function Server({ match }) {
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${match.params.serverId}`
  );

  return (
    <>
      {/* Left sidebar */}
      <Categories serverId={match.params.serverId} />
      <CategoryModal serverId={match.params.serverId} />
      <Leave serverId={match.params.serverId} />

      {/* Main */}
      {server && (
        <Switch>
          <PrivateRoute
            exact
            path="/servers/:serverId"
            render={() => <About server={server} />}
          />
          <PrivateRoute
            exact
            path="/servers/:serverId/channels/:channelId"
            render={() => <Channel channelId={match.params.channelId} />}
          />
        </Switch>
      )}

      {/* Right sidebar */}
      <Members serverId={match.params.serverId} />
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
