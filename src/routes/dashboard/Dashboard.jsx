import React from "react";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import Home from "./Home";
import Explore from "./Explore";
import Server from "../server/Server";
import Sidebar from "../../components/sidebar/Sidebar";
import Join from "../server/Join";
import UserSettings from "../Settings";

function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <Switch>
        <PrivateRoute exact path="/explore" component={Explore} />
        <PrivateRoute path="/servers/:serverId" component={Server} />
        <PrivateRoute exact path="/join/:serverId" component={Join} />
        <PrivateRoute exact path="/settings" component={UserSettings} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Container>
  );
}

export default Dashboard;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
`;
