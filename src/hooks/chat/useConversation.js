import { useState, useEffect } from "react";
import socket from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

function useConversation(userId) {
  const [conversation, setConversation] = useState();
  const { user } = useAuth();

  // Load conversation
  useEffect(() => {
    (async () => {
      // Check conversation existence
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
      let conversation = exist;

      // If the conversation does not exist, create it.
      if (!exist) {
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
        const create = await createRes.json();
        conversation = create;
      }

      // Set the conversation.
      setConversation(conversation);
    })();
  }, [userId]);

  // Set up listeners when user updates
  const handleUpdate = (user) => {
    const updated = { ...conversation };
    updated.members = updated.members.map((member) => {
      console.log(member._id === user.document._id)
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
