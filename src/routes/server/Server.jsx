import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import SidebarLeft from "../../components/server/sidebar/Left";
import SidebarRight from "../../components/server/sidebar/Right";
import { useRight } from "../../context/sidebars/RightContext";
import Channel from "./Channel";
import Settings from "./Settings";
import useFetch from "../../hooks/shared/useFetch";
import Entry from "./Entry";

function Server({ match }) {
  const { isOpen } = useRight();
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${match.params.serverId}`
  );

  return (
    <Container $isRightOpen={isOpen}>
      {/* Left sidebar */}
      <SidebarLeft serverId={match.params.serverId} />

      {/* Main */}
      {server && (
        <Switch>
          <PrivateRoute
            exact
            path="/servers/:serverId/channels/:channelId"
            component={Channel}
          />
          <PrivateRoute
            exact
            path="/servers/:serverId/settings"
            component={Settings}
          />
          <PrivateRoute exact path="/servers/:serverId" component={Entry} />
        </Switch>
      )}

      {/* Right sidebar */}
      {isOpen && <SidebarRight serverId={match.params.serverId} />}
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
  display: flex;
  width: 100%;
`;
