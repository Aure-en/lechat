import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";
import useLoadConversation from "../chat/useConversation";
import useMessage from "../chat/useMessage";
import useActivity from "../chat/useActivity";
import socket from "../../socket/socket";

function useConversation(id) {
  // For messages form
  const [editing, setEditing] = useState(false);
  // Used to load more messages
  const [lastMessageId, _setLastMessageId] = useState("");

  // Using a ref and storing the lastMessageId state value in a ref
  // So that the event listener can use the updated value.
  const lastMessageIdRef = useRef(lastMessageId);

  const setLastMessageId = (id) => {
    lastMessageIdRef.current = id;
    _setLastMessageId(id);
  };

  // Get conversation and its messages
  const { conversation } = useLoadConversation(id);
  const { messages, setMessages } = useMessage(
    { conversation: conversation && conversation._id },
    lastMessageId
  );

  // User activity
  const { user } = useAuth();
  const { handleReadConversation } = useUnread();
  const { updateConversationActivity } = useActivity();

  const messagesRef = useRef(); // Handle messages scrolling

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

  // On scroll, load more messages
  useEffect(() => {
    if (!messagesRef || !messagesRef.current) return;
    const getPreviousMessages = () => {
      // If we scrolled to the top of the messages container, load more messages.
      if (messagesRef.current.scrollTop <= 0) {
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
  }, [messages, messagesRef]);

  return {
    editing,
    setEditing,
    conversation,
    messages,
    setMessages,
    messagesRef,
  };
}

export default useConversation;
