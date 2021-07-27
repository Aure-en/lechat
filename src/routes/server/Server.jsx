import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import { useRight } from "../../context/sidebars/RightContext";
import useWindowSize from "../../hooks/shared/useWindowSize";
import useFetch from "../../hooks/shared/useFetch";
import SidebarLeft from "../../components/server/sidebar/Left";
import SidebarRight from "../../components/server/sidebar/Right";
import Channel from "./Channel";
import Settings from "./Settings";

import Entry from "./Entry";

function Server({ match }) {
  const { isOpen } = useRight();
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${match.params.serverId}`
  );
  const windowSize = useWindowSize();

  return (
    <Container $isRightOpen={isOpen}>
      {/* Left sidebar */}
      {windowSize.width > 768 && (
        <SidebarLeft serverId={match.params.serverId} />
      )}

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
