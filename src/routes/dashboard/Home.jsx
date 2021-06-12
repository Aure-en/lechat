import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import Friends from "../Friends";
import Conversation from "../Conversation";

function Home() {
  return (
    <Switch>
      <PrivateRoute exact path="/friends" component={Friends} />
      <PrivateRoute
        exact
        path="/conversations/:userId"
        component={Conversation}
      />
    </Switch>
  );
}

export default Home;
