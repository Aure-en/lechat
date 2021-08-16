import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// User can only access those routes if they are logged in.
function PrivateRoute({ component: Component, render: Render, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
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
