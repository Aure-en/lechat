import React, { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";

const PermissionContext = createContext();

export function usePermission() {
  return useContext(PermissionContext);
}

/**
 * Give the list of users who have permissions to do certain actions
 * in a server or a conversation.
 * @param {*} param
 */
export function PermissionProvider({ location, children }) {
  /**
   * Object containing list of users with a specific permission.
   * {
   *    server: [] - List of users who can update / delete the server.
   *    sections: [] - List of users who can create / update / delete channels and categories
   *    messages: [] - List of users who can delete other users' messages
   *    pins: [] - List of users who can pin messages
   * }
   */
  const [permissions, setPermissions] = useState({
    server: [],
    sections: [],
    messages: [],
    pins: [],
  });

  // Set up permissions
  useEffect(() => {
    (async () => {
      // Set up the URL to fetch the room information
      let url;

      if (location.server) {
        url = `${process.env.REACT_APP_SERVER}/servers/${location.server}`;
      } else if (location.conversation) {
        url = `${process.env.REACT_APP_SERVER}/conversations/${location.conversation}`;
      }

      // Get the room information
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const json = await res.json();

      // Set up permissions depending on the type of room
      if (location.server) {
        setPermissions({
          server: [json.admin],
          sections: [json.admin],
          messages: [json.admin],
          pins: [json.admin],
        });
      } else if (location.conversation) {
        setPermissions((prev) => ({
          ...prev,
          pins: [...json.members.map((member) => member._id)],
        }));
      }
    })();
  }, [location.server, location.conversation]);

  const value = permissions;

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
  location: PropTypes.shape({
    conversation: PropTypes.string,
    server: PropTypes.string,
    channel: PropTypes.string,
  }).isRequired,
};

PermissionProvider.defaultProps = {
  children: <></>,
};
