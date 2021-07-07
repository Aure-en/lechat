import { useState, useEffect } from "react";
import socket from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";
import useActivity from "./useActivity";

function useConversation(userId) {
  const [conversation, setConversation] = useState();
  const { user } = useAuth();
  const { updateConversationActivity } = useActivity();

  /**
   * Check if the conversation already exists.
   * @returns {object} - returns it if it does, otherwise, returns undefined.
   */
  const checkExistence = async () => {
    const existRes = await fetch(
      `${process.env.REACT_APP_URL}/conversations?members=${userId},${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const exist = await existRes.json();
    return exist;
  };

  /**
   * Create the conversation and returns it.
   */
  const create = async () => {
    const createRes = await fetch(
      `${process.env.REACT_APP_URL}/conversations`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          members: `["${userId}","${user._id}"]`,
        }),
      }
    );
    const conversation = await createRes.json();
    return conversation;
  };

  // Load conversation
  useEffect(() => {
    (async () => {
      let conversation;
      // Check conversation existence
      // If it exists, set the conversation state.
      conversation = await checkExistence();

      // If the conversation does not exist, create it.
      if (!conversation) {
        conversation = await create();

        // Update the member's activity to insert the conversation
        conversation.members.forEach((member) =>
          updateConversationActivity(member, conversation._id)
        );
      }

      // Set the conversation.
      setConversation(conversation);
    })();
  }, [userId]);

  // Set up listeners when user updates
  const handleUpdate = (user) => {
    const updated = { ...conversation };
    updated.members = updated.members.map((member) => {
      if (member._id === user.document._id) {
        return user.document;
      }
      return member;
    });
    setConversation(updated);
  };

  useEffect(() => {
    socket.on("user update", handleUpdate);
    return () => socket.off("user update", handleUpdate);
  }, [conversation]);

  return { conversation };
}

export default useConversation;
