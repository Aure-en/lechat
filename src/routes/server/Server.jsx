import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import { useSidebar } from "../../context/SidebarContext";
import { PermissionProvider } from "../../context/PermissionContext";
import useWindowSize from "../../hooks/shared/useWindowSize";
import useServer from "../../hooks/server/server/useServer";
import SidebarLeft from "../../components/server/sidebar/Left";
import SidebarRight from "../../components/server/sidebar/Right";
import NotFound from "../../components/error/NotFound";
import Channel from "./Channel";
import Entry from "./Entry";

function Server({ match }) {
  const { isOpen, setIsOpen } = useSidebar();
  const { server, loading } = useServer(match.params.serverId);
  const { windowSize } = useWindowSize();

  // Save latest visited server
  useEffect(() => {
    if (server) sessionStorage.setItem("server", server._id);
  }, [server]);

  if (server) {
    return (
      <PermissionProvider location={{ server: match.params.serverId }}>
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
              <PrivateRoute exact path="/servers/:serverId" component={Entry} />
            </Switch>
          )}

          {/* Right sidebar */}
          {isOpen && (
            <SidebarRight
              serverId={match.params.serverId}
              close={() => setIsOpen(false)}
            />
          )}
        </Container>
      </PermissionProvider>
    );
  }

  if (!server && !loading) {
    return (
      <Empty>
        <NotFound />
      </Empty>
    );
  }

  return <></>;
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
  height: 100%;
  width: 100%;
`;

const Empty = styled.div`
  margin-left: 1rem;
`;
