import React from "react";
import { Route, Redirect } from "react-router-dom";

// User can only access those routes if they are logged in.
function PrivateRoute({ component: Component, render: Render, ...rest }) {
  const currentUser = {
    user: localStorage.getItem("user"),
    jwt: localStorage.getItem("jwt"),
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser.jwt ? (
          Render ? (
            Render(props)
          ) : Component ? (
          <Component {...props} />
        ) : null 
        ) : (
          <Redirect to="/auth/login" />
        );
      }}
    />
  );
}

export default PrivateRoute;
