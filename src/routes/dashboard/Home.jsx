import React from "react";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import PrivateRoute from "../types/PrivateRoute";
import Friends from "../Friends";
import Conversation from "../Conversation";
import Sidebar from "../../components/home/Sidebar";
import Nav from "../../components/home/Nav";

function Home() {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Nav />
        <Switch>
          <PrivateRoute exact path="/user/friends" component={Friends} />
          <PrivateRoute
            exact
            path="/conversations/:userId"
            component={Conversation}
          />
        </Switch>
      </Content>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: grid;
  grid-template-columns: 17.5rem 1fr 15rem;
  width: 100%;
`;

const Content = styled.main`
  background: ${(props) => props.theme.bg_chat};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
`;