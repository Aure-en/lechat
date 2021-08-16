import React, { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import socket from "../socket/socket";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, _setUser] = useState(
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
  );

  // Set user and persist the new value in localStorage.
  const setUser = (user) => {
    _setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logOut = () => {
    _setUser(undefined);
    localStorage.removeItem("user");
  };

  // Socket listeners to handle authentication
  const handleConnect = () => {
    if (user) {
      socket.emit("authentication", JSON.stringify(user));
    }
  };

  useEffect(() => {
    socket.on("connect", handleConnect);
    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);

  // Socket listeners to update the user data.
  const handleUpdate = (updated) => {
    setUser(updated.document);
  };

  useEffect(() => {
    socket.on("account update", handleUpdate);
    return () => socket.off("account update", handleUpdate);
  }, [user]);

  const value = {
    user,
    setUser,
    logOut,
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
