import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";
import useLoadConversation from "../chat/useConversation";
import useActivity from "../chat/useActivity";
import socket from "../../socket/socket";

function useConversation(id) {
  // For messages form
  const [editing, setEditing] = useState(false);

  // Get conversation and its messages
  const { conversation } = useLoadConversation(id);

  // User activity
  const { user } = useAuth();
  const { handleReadConversation } = useUnread();
  const { updateConversationActivity } = useActivity();

  // On mount, set the conversation as read.
  useEffect(() => {
    if (conversation)
      setTimeout(() => handleReadConversation(conversation._id), 3000);
  }, [conversation]);

  // On unmount, update the activity
  useEffect(() => {
    return () =>
      conversation && updateConversationActivity(user, conversation._id);
  }, [conversation]);

  // Join / leave the channel socket room
  useEffect(() => {
    if (conversation) {
      socket.emit("join room", conversation._id);
    }
    return () => socket.emit("leave room");
  }, [conversation]);

  // On close, update the activity
  useEffect(() => {
    const updateActivity = () => {
      if (!conversation) return;
      const body = JSON.stringify({
        conversation: conversation._id,
      });
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        type: "application/json",
      };
      const blob = new Blob([body], headers);
      navigator.sendBeacon(
        `${process.env.REACT_APP_URL}/activity/${user._id}/conversations`,
        blob
      );
    };

    document.addEventListener("visibilitychange", updateActivity);
    return () => {
      updateActivity();
      document.removeEventListener("visibilitychange", updateActivity);
    };
  }, [conversation]);

  return {
    editing,
    setEditing,
    conversation,
  };
}

export default useConversation;
