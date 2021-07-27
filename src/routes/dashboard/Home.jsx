import React from "react";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import Friends from "./Friends";
import Servers from "./Servers";
import Conversation from "../Conversation";
import Sidebar from "../../components/home/Sidebar";
import useWindowSize from "../../hooks/shared/useWindowSize";

function Home() {
  const windowSize = useWindowSize();

  return (
    <Container>
      {windowSize.width > 768 && <Sidebar />}
      <Switch>
        <PrivateRoute exact path="/" component={Friends} />
        <PrivateRoute exact path="/user/servers" component={Servers} />
        <PrivateRoute
          exact
          path="/conversations/:userId"
          component={Conversation}
        />
      </Switch>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;

  @media all and (min-width: 768px) {
    display: grid;
    grid-template-columns: 17.5rem 1fr;
  }

  @media all and (min-width: 1400px) {
    grid-template-columns: 17.5rem 1fr 17.5rem;
  }
`;
