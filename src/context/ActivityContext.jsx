import React, { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import socket from "../socket/socket";
import { useAuth } from "./AuthContext";

const ActivityContext = createContext();

export function useActivity() {
  return useContext(ActivityContext);
}

export function ActivityProvider({ children }) {
  const [activity, setActivity] = useState();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const res = await fetch(
        `${process.env.REACT_APP_URL}/activity/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      const json = await res.json();
      if (!json.error) setActivity(json);
    })();
  }, [user]);

  // Socket listener to update activity
  const handleUpdate = (updated) => {
    setActivity(updated);
  };

  useEffect(() => {
    socket.on("activity update", handleUpdate);
    return () => socket.off("activity update", handleUpdate);
  }, [activity]);

  const value = {
    activity,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export default ActivityContext;

ActivityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ActivityProvider.defaultProps = {
  children: <></>,
};
