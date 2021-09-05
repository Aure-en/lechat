import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import GlobalStyles from "./style/global/globalStyles";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { UnreadProvider } from "./context/UnreadContext";
import PrivateRoute from "./routes/types/PrivateRoute";
import EntryRoute from "./routes/types/EntryRoute";
import Entry from "./routes/entry/Entry";
import Dashboard from "./routes/dashboard/Dashboard";
import Toast from "./components/shared/Toast";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <GlobalStyles />
        <AuthProvider>
          <UnreadProvider>
            <Wrapper>
              <Switch>
                <EntryRoute path="/auth" component={Entry} />
                <PrivateRoute path="/" component={Dashboard} />
              </Switch>
            </Wrapper>
            <Toast />
          </UnreadProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100%;
`;
