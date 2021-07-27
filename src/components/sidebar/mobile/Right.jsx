import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Server from "../../server/sidebar/Left";

function Right() {
  return (
    <Container>
      <Switch>
        <Route
          path="/servers/:serverId"
          render={({ match }) => <Server serverId={match.params.serverId} />}
        />
      </Switch>
    </Container>
  );
}

export default Right;

const Container = styled.div`
`;
