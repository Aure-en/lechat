import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import GlobalStyles from "./style/global/globalStyles";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { UnreadProvider } from "./context/UnreadContext";
import PrivateRoute from "./routes/types/PrivateRoute";
import EntryRoute from "./routes/types/EntryRoute";
import Login from "./routes/entry/Login";
import SignUp from "./routes/entry/SignUp";
import Dashboard from "./routes/dashboard/Dashboard";
import socket from "./socket/socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      if (localStorage.getItem("user")) {
        socket.emit("authentification", localStorage.getItem("user"));
      }
    });
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <GlobalStyles />
        <AuthProvider>
          <UnreadProvider>
            <Wrapper>
              <Switch>
                <EntryRoute exact path="/login" component={Login} />
                <EntryRoute exact path="/signup" component={SignUp} />
                <PrivateRoute path="/" component={Dashboard} />
              </Switch>
            </Wrapper>
          </UnreadProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
`;
