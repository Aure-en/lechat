import { useEffect, useState, useRef } from "react";

import useMessage from "../../chat/useMessage";
import useFetch from "../../shared/useFetch";
import { useAuth } from "../../../context/AuthContext";
import { useUnread } from "../../../context/UnreadContext";
import useActivity from "../../chat/useActivity";
import socket from "../../../socket/socket";

function useChannel(serverId, channelId) {
  // For messages form
  const [editing, setEditing] = useState();

  // Get channel informations & messages
  const { data: channel } = useFetch(
    `${process.env.REACT_APP_SERVER}/channels/${channelId}`
  );

  // User activity
  const { updateChannelActivity } = useActivity();
  const { handleReadChannel } = useUnread();
  const { user } = useAuth();

  useEffect(() => {
    if (channel) {
      // Store last visited channel to redirect the user to it later.
      localStorage.setItem(serverId, channelId);
      // Set the channel as read
      setTimeout(() => handleReadChannel(serverId, channelId), 3000);
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        type: "application/json",
      };
      const blob = new Blob([body], headers);
      navigator.sendBeacon(
        `${process.env.REACT_APP_SERVER}/activity/${user._id}/servers`,
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
  };
}

export default useChannel;
