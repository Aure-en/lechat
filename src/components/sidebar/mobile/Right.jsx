import React from "react";
import { Switch, Route } from "react-router-dom";
import Server from "../../server/sidebar/Left";
import Conversations from "../../home/Sidebar";
import { PermissionProvider } from "../../../context/PermissionContext";

function Right() {
  return (
    <div>
      <Switch>
        <Route
          path="/servers/:serverId"
          render={({ match }) => (
            <PermissionProvider location={{ server: match.params.serverId }}>
              <Server serverId={match.params.serverId} />
            </PermissionProvider>
          )}
        />
        <Route path="/" component={Conversations} />
      </Switch>
    </div>
  );
}

export default Right;
