import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import { SidebarProvider } from "../../context/SidebarContext";
import useWindowSize from "../../hooks/shared/useWindowSize";
import Sidebar from "../../components/sidebar/Sidebar";
import Mobile from "../../components/sidebar/mobile/Mobile";

const Explore = lazy(() => import("./Explore"));
const Settings = lazy(() => import("../server/Settings"));
const Server = lazy(() => import("../server/Server"));
const Join = lazy(() => import("../server/Join"));
const UserSettings = lazy(() => import("../Settings"));
const Home = lazy(() => import("./Home"));

function Dashboard() {
  const { windowSize } = useWindowSize();

  return (
    <Container>
      {/* Different sidebar depending on the window size */}
      {windowSize.width < 768 && <Mobile />}
      {windowSize.width > 768 && <Sidebar />}
      <SidebarProvider>
        <Suspense fallback={<></>}>
          <Switch>
            <PrivateRoute exact path="/explore" component={Explore} />
            <PrivateRoute
              exact
              path="/servers/:serverId/settings"
              component={Settings}
            />
            <PrivateRoute path="/servers/:serverId" component={Server} />
            <PrivateRoute exact path="/join/:serverId" component={Join} />
            <PrivateRoute exact path="/settings" component={UserSettings} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </Suspense>
      </SidebarProvider>
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
