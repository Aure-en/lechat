import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// User can only access those routes if they are not logged in.
function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Redirect to="/" /> : <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
