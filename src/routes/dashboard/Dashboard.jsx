import React from "react";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import { RightProvider } from "../../context/sidebars/RightContext";
import useWindowSize from "../../hooks/shared/useWindowSize";
import Home from "./Home";
import Explore from "./Explore";
import Server from "../server/Server";
import Sidebar from "../../components/sidebar/Sidebar";
import Mobile from "../../components/sidebar/mobile/Mobile";
import Join from "../server/Join";
import UserSettings from "../Settings";

function Dashboard() {
  const windowSize = useWindowSize();

  return (
    <Container>
      {/* Different sidebar depending on the window size */}
      {windowSize.width < 768 && <Mobile />}
      {windowSize.width > 768 && <Sidebar />}
      <RightProvider>
        <Switch>
          <PrivateRoute exact path="/explore" component={Explore} />
          <PrivateRoute path="/servers/:serverId" component={Server} />
          <PrivateRoute exact path="/join/:serverId" component={Join} />
          <PrivateRoute exact path="/settings" component={UserSettings} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </RightProvider>
    </Container>
  );
}

export default Dashboard;

const Container = styled.div`
  height: 100%;

  @media all and (min-width: 768px) {
    display: grid;
    grid-template-columns: auto 1fr;
  }
`;
