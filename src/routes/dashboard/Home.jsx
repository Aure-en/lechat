import React from "react";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import Friends from "./Friends";
import Servers from "./Servers";
import Conversation from "../Conversation";
import Sidebar from "../../components/home/Sidebar";

function Home() {
  return (
    <Container>
      <Sidebar />
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
  display: grid;
  grid-template-columns: 17.5rem 1fr 17.5rem;
  width: 100%;
`;

const Content = styled.div`
  background: ${(props) => props.theme.bg_secondary};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
`;
