import { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth } from "../../../context/AuthContext";
import { useUnread } from "../../../context/UnreadContext";
import useActivity from "../../chat/useActivity";
import socket from "../../../socket/socket";

function useChannel(serverId, channelId) {
  const [editing, setEditing] = useState();

  // User activity
  const { updateChannelActivity } = useActivity();
  const { handleReadChannel } = useUnread();
  const { user } = useAuth();

  // Channel informations & messages
  const { data: channel, error } = useSWR([
    `${process.env.REACT_APP_SERVER}/channels/${channelId}`,
    sessionStorage.getItem("jwt"),
  ]);

  useEffect(() => {
    if (channel) {
      // Store last visited channel to redirect the user to it later.
      sessionStorage.setItem(serverId, channelId);
      // Set the channel as read (leave time for <New /> to be displayed)
      setTimeout(() => handleReadChannel(serverId, channelId), 1000);
    }
  }, [channel]);

  // On unmount, update the activity.
  useEffect(() => {
    return () =>
      serverId && channelId && updateChannelActivity(user, serverId, channelId);
  }, [channelId]);

  // On close, update the activity.
  useEffect(() => {
    const updateActivity = () => {
      if (!serverId || !channelId) return;
      const body = JSON.stringify({
        server: serverId,
        channel: channelId,
      });
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        type: "application/json",
      };
      const blob = new Blob([body], headers);
      navigator.sendBeacon(
        `${process.env.REACT_APP_SERVER}/activity/${user?._id}/servers`,
        blob
      );
    };

    document.addEventListener("visibilitychange", updateActivity);
    return () => {
      updateActivity();
      document.removeEventListener("visibilitychange", updateActivity);
    };
  }, [channelId]);

  // Join / leave the channel socket room
  useEffect(() => {
    if (channelId) {
      socket.emit("join room", channelId);
    }
    return () => socket.emit("leave room", channelId);
  }, [channelId]);

  return {
    editing,
    setEditing,
    channel,
    error,
  };
}

export default useChannel;
