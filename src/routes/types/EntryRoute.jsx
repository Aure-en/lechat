import React from "react";
import { Route, Redirect } from "react-router-dom";

// User can only access those routes if they are logged in.
function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = {
    user: localStorage.getItem("user"),
    jwt: localStorage.getItem("jwt"),
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser.jwt ? <Redirect to="/" /> : <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
