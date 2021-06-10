import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./routes/types/PrivateRoute";
import EntryRoute from "./routes/types/EntryRoute";
import Login from "./routes/entry/Login";
import SignUp from "./routes/entry/SignUp";
import Dashboard from "./routes/dashboard/Dashboard";
import Server from "./routes/server/Server";
import Settings from "./routes/server/Settings";
import UserSettings from "./routes/Settings";
import Friends from "./routes/Friends";

function App() {
  return (
    <Router>
      <Switch>
        <EntryRoute exact path="/login" component={Login} />
        <EntryRoute exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute
          exact
          path={[
            "/servers/:serverId",
            "/servers/:serverId/channels/:channelId",
          ]}
          component={Server}
        />
        <PrivateRoute
          exact
          path="/servers/:serverId/settings"
          component={Settings}
        />
        <PrivateRoute exact path="/settings" component={UserSettings} />
        <PrivateRoute exact path="/friends" component={Friends} />
      </Switch>
    </Router>
  );
}

export default App;
