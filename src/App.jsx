import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { SWRConfig } from "swr";
import GlobalStyles from "./style/global/globalStyles";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { UnreadProvider } from "./context/UnreadContext";
import PrivateRoute from "./routes/types/PrivateRoute";
import EntryRoute from "./routes/types/EntryRoute";
import Toast from "./components/shared/Toast";

const Entry = lazy(() => import("./routes/entry/Entry"));
const Dashboard = lazy(() => import("./routes/dashboard/Dashboard"));

const fetcher = (url, jwt = undefined) => {
  if (jwt) {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        return json;
      });
  }
  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (json.error) throw new Error(json.error);
      return json;
    });
};

function App() {
  return (
    <Router>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          fetcher,
        }}
      >
        <ThemeProvider>
          <GlobalStyles />
          <AuthProvider>
            <UnreadProvider>
              <Wrapper>
                <Suspense fallback={<></>}>
                  <Switch>
                    <EntryRoute path="/auth" component={Entry} />
                    <PrivateRoute path="/" component={Dashboard} />
                  </Switch>
                </Suspense>
              </Wrapper>
              <Toast />
            </UnreadProvider>
          </AuthProvider>
        </ThemeProvider>
      </SWRConfig>
    </Router>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100%;
`;
