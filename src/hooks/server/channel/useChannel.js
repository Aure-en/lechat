import { useEffect, useState, useRef } from "react";

import useMessage from "../../chat/useMessage";
import useFetch from "../../shared/useFetch";
import { useAuth } from "../../../context/AuthContext";
import { useUnread } from "../../../context/UnreadContext";
import useActivity from "../../chat/useActivity";
import socket from "../../../socket/socket";

function useChannel(serverId, channelId) {
  // Props for messages form
  const [editing, setEditing] = useState();
  // Used to load more messages
  const [lastMessageId, _setLastMessageId] = useState("");

  // Using a ref and storing the lastMessageId state value in a ref
  // So that the event listener can use the updated value.
  const lastMessageIdRef = useRef(lastMessageId);

  const setLastMessageId = (id) => {
    lastMessageIdRef.current = id;
    _setLastMessageId(id);
  };

  // Get channel informations & messages
  const { data: channel } = useFetch(
    `${process.env.REACT_APP_URL}/channels/${channelId}`
  );
  const { messages, setMessages } = useMessage(
    channelId && { channel: channelId },
    channelId && lastMessageId
  );

  // User activity
  const { updateChannelActivity } = useActivity();
  const { handleReadChannel } = useUnread();
  const { user } = useAuth();

  const messagesRef = useRef(); // Handle messages scrolling

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
        `${process.env.REACT_APP_URL}/activity/${user._id}/servers`,
        blob
      );
    };

    document.addEventListener("visibilitychange", updateActivity);
    return () => {
      updateActivity();
      document.removeEventListener("visibilitychange", updateActivity);
    };
  }, [channelId]);

  // On scroll, load more messages
  useEffect(() => {
    if (!messagesRef || !messagesRef.current) return;
    const getPreviousMessages = () => {
      console.log(channelId, messages);
      // If we scrolled to the top of the messages container, load more messages.
      if (messagesRef.current.scrollTop <= 0 && messages.length > 1) {
        // Tells useMessage the key of the latest message we loaded
        // useMessage will then fetch messages with a key < the latest key.
        // and add them to the messages array.
        if (
          !lastMessageIdRef.current ||
          messages[0]._id < lastMessageIdRef.current
        ) {
          setLastMessageId(messages[0]._id);
        }
      }
    };

    messagesRef.current.addEventListener("scroll", getPreviousMessages);
    return () => {
      messagesRef.current.removeEventListener("scroll", getPreviousMessages);
    };
  }, [messages, messagesRef, channelId]);

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
    messages,
    setMessages,
    channel,
    messagesRef,
  };
}

export default useChannel;
