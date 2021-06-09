import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./routes/types/PrivateRoute";
import EntryRoute from "./routes/types/EntryRoute";
import Login from "./routes/entry/Login";
import SignUp from "./routes/entry/SignUp";
import Dashboard from "./routes/dashboard/Dashboard";
import Server from "./routes/Server";

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
      </Switch>
    </Router>
  );
}

export default App;
