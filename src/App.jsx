import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import io from "socket.io-client";
import PrivateRoute from "./routes/types/PrivateRoute";
import EntryRoute from "./routes/types/EntryRoute";
import Login from "./routes/entry/Login";
import SignUp from "./routes/entry/SignUp";
import Dashboard from "./routes/dashboard/Dashboard";

function App() {
  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL);

    socket.on("connect", (socket) => {
      console.log("A user connected");
    });
  }, []);

  return (
    <Router>
      <Switch>
        <EntryRoute exact path="/login" component={Login} />
        <EntryRoute exact path="/signup" component={SignUp} />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
