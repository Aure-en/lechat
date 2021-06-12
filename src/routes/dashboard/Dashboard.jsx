import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import Home from "./Home";
import Server from "../server/Server";
import ServerSettings from "../server/Settings";
import Sidebar from "../../components/sidebar/Sidebar";
import Join from "../server/Join";
import UserSettings from "../Settings";

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Switch>
        <PrivateRoute
          exact
          path="/servers/:serverId/settings"
          component={ServerSettings}
        />
        <PrivateRoute path="/servers/:serverId" component={Server} />
        <PrivateRoute exact path="/join/:serverId" component={Join} />
        <PrivateRoute exact path="/settings" component={UserSettings} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default Dashboard;
