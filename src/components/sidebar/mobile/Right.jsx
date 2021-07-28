import React from "react";
import { Switch, Route } from "react-router-dom";
import Server from "../../server/sidebar/Left";
import Conversations from "../../home/Sidebar";

function Right() {
  return (
    <div>
      <Switch>
        <Route
          path="/servers/:serverId"
          render={({ match }) => <Server serverId={match.params.serverId} />}
        />
        <Route path="/" component={Conversations} />
      </Switch>
    </div>
  );
}

export default Right;
