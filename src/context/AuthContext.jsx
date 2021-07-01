import React, { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import socket from "../socket/socket";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Set user and persist the new value in localStorage.
  const setValue = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Socket listeners to update the user data.
  const handleUpdate = (updated) => {
    setValue(updated.document);
  };

  useEffect(() => {
    socket.on("account update", handleUpdate);
    return () => socket.off("account update", handleUpdate);
  }, [user]);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AuthProvider.defaultProps = {
  children: <></>,
};
