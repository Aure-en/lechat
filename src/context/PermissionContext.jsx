import React, { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import useServer from "../hooks/server/server/useServer";

const PermissionContext = createContext();

export function usePermission() {
  return useContext(PermissionContext);
}

export function PermissionProvider({ serverId, children }) {
  // List of users who can update / delete the whole server.
  // For now, it is only the server owner.
  const [server, setServer] = useState([]);
  // List of users who can create / update / delete channels and categories
  const [sections, setSections] = useState([]);
  // List of users who can delete other users' messages
  const [messages, setMessages] = useState([]);
  // List of users who can pin messages
  const [pins, setPins] = useState([]);

  // Load the server informations
  const { server: informations } = useServer(serverId);

  // Set up permissions
  // For now, only the owner has all permissions.
  useEffect(() => {
    if (!informations) return;
    setServer([informations.admin]);
    setSections([informations.admin]);
    setMessages([informations.admin]);
    setPins([informations.admin]);
  }, [informations]);

  const value = {
    server,
    sections,
    messages,
    pins,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

export default PermissionContext;

PermissionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  serverId: PropTypes.string.isRequired,
};

PermissionProvider.defaultProps = {
  children: <></>,
};
