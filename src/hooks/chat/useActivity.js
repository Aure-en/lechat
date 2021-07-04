import { useState, useEffect } from "react";
import socket from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

function useActivity() {
  const [activity, setActivity] = useState();
  const { user } = useAuth();

  // Loads activity
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

  // Set up socket listener to update activity
  const handleUpdate = (updated) => {
    setActivity(updated);
  };

  useEffect(() => {
    socket.on("activity update", handleUpdate);
    return () => socket.off("activity update", handleUpdate);
  }, [activity]);

  // Update the database when the user visits a room
  const handleActivity = (room) => {
    fetch(`${process.env.REACT_APP_URL}/activity/${user._id}/rooms/${room}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  };

  return {
    activity,
    handleActivity,
  };
}

export default useActivity;
