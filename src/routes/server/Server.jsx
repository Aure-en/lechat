import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import Sidebar from "../../components/server/Sidebar";
import CategoryModal from "../../components/modals/server/Category";
import Channel from "./Channel";
import useFetch from "../../hooks/shared/useFetch";
import Members from "../../components/server/Members";
import Leave from "../../components/server/Leave";

function Server({ match }) {
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${match.params.serverId}`
  );

  return (
    <Container>
      {/* Left sidebar */}
      <Sidebar serverId={match.params.serverId} />
      {/* <CategoryModal serverId={match.params.serverId} />
      <Leave serverId={match.params.serverId} /> */}

      {/* Main */}
      {server && (
        <Switch>
          <PrivateRoute
            exact
            path="/servers/:serverId/channels/:channelId"
            render={() => <Channel />}
          />
        </Switch>
      )}

      {/* Right sidebar */}
      <Members serverId={match.params.serverId} />
    </Container>
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

const Container = styled.div`
  display: grid;
  grid-template-columns: 17.5rem 1fr 15rem;
  width: 100%;
`;
