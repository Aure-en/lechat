import { useEffect } from "react";
import useSWR from "swr";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket/socket";

/**
 * Activity saves the timestamp at which the user last visited a room.
 * It is used to:
 * - Differentiate messages the user has read from
 *   messages they haven't read.
 * - Notify the user when they have unread messages.
 */
function useActivity() {
  const { user } = useAuth();
  const { data: activity, mutate } = useSWR([
    `${process.env.REACT_APP_SERVER}/activity/${user._id}`,
    sessionStorage.getItem("jwt"),
  ]);

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

  // Set up socket listener to update activity
  function handleUpdate() {
    mutate();
  }

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
