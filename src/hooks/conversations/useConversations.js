import { useState, useEffect } from "react";
import useSWR from "swr";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket/socket";

function useConversations() {
  const { user } = useAuth();
  const { data: conversations, mutate } = useSWR([
    `${process.env.REACT_APP_SERVER}/users/${user?._id}/conversations`,
    sessionStorage.getItem("jwt"),
  ]);
  const [withMessage, setWithMessage] = useState([]);

  /**
   * Fetch the conversations' latest message
   * Add the latest message to the conversations
   * Only returns conversations with a message.
   */
  const getMessages = async () => {
    const conversationsId = conversations.map(
      (conversation) => conversation._id
    );

    const messages = await Promise.all(
      conversationsId.map(async (id) => {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/conversations/${id}/messages?limit=1`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          }
        );

        const json = await res.json();
        return json;
      })
    );

    // Add the latest message to the conversations
    let withMessage = [...conversations];

    withMessage = withMessage.map((conversation, index) => {
      if (messages[index].length > 0) {
        return { ...conversation, message: messages[index][0] };
      }
      return conversation;
    });

    // Only keep the conversations with a message
    withMessage = withMessage.filter((conversation) => conversation.message);

    // Sort by latest message
    withMessage = withMessage.sort(
      (a, b) => b.message.timestamp - a.message.timestamp
    );

    setWithMessage(withMessage);
  };

  useEffect(() => {
    if (conversations) {
      getMessages();
    }
  }, [conversations]);

  // Set up socket listeners

  /**
   * Socket listeners to update conversations list when a new
   * conversation is created, and the current user is one of its
   * members.
   */
  const handleConversation = (update) => {
    mutate(async (prev) => [...prev, update.document]);
  };

  /**
   * Socket listeners to listen to messages.
   * If a new message is written in one of the conversations,
   * but the conversation wasn't yet displayed because it didn't have any message,
   * add it to the withMessage conversations list.
   */
  const handleWithMessage = (document) => {
    const message = document.document;

    if (
      message.conversation &&
      conversations.find(
        (conversation) => conversation._id === message.conversation
      ) &&
      !withMessage.find(
        (conversation) => conversation._id === message.conversation
      )
    ) {
      setWithMessage((prev) => {
        const conversation = conversations.find(
          (conversation) => conversation._id === message.conversation
        );
        return [
          {
            ...conversation,
            message,
          },
          ...prev,
        ];
      });
    }
  };

  useEffect(() => {
    socket.on("insert conversation", handleConversation);
    socket.on("insert message", handleWithMessage);
    return () => {
      socket.off("insert conversation", handleConversation);
      socket.off("insert message", handleWithMessage);
    };
  }, [withMessage, conversations]);

  return {
    withMessage,
  };
}

export default useConversations;
