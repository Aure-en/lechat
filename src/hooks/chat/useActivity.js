import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket/socket";

/**
 * Activity saves the timestamp at which the user last visited a room.
 * It is used to differentiate messages the user has read from
 * messages they haven't read.
 */
function useActivity() {
  const [activity, setActivity] = useState();
  const { user } = useAuth();

  // Loads activity
  useEffect(() => {
    (async () => {
      if (!user) return;
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/activity/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
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

  // Update the activity document when the user leaves a channel
  const updateChannelActivity = (user, serverId, channelId) => {
    fetch(`${process.env.REACT_APP_SERVER}/activity/${user._id}/servers`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        server: serverId,
        channel: channelId,
      }),
    });
  };

  // Update the activity document when the user leaves a conversation
  const updateConversationActivity = (user, conversationId) => {
    fetch(
      `${process.env.REACT_APP_SERVER}/activity/${user._id}/conversations`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: conversationId,
        }),
      }
    );
  };

  useEffect(() => {
    socket.on("activity update", handleUpdate);
    return () => socket.off("activity update", handleUpdate);
  }, [activity]);

  return {
    activity,
    updateChannelActivity,
    updateConversationActivity,
  };
}

export default useActivity;
