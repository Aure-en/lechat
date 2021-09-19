import { useEffect } from "react";
import useSWR from "swr";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket/socket";

function useConversations() {
  /**
   * Fetch the conversations' latest message
   * Add the latest message to the conversations
   * Only returns conversations with a message.
   */
  const getMessages = async (conversations) => {
    if (!conversations) return;

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

    return withMessage;
  };

  /**
   * Fetch the conversations.
   * For each conversation, fetch the latest message.
   * Only keep conversations with a latest message.
   */
  const fetcher = async (url, jwt = undefined) => {
    if (jwt) {
      // Fetch conversations
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const json = await res.json();

      if (json.error) {
        throw new Error(json.error);
      }

      // For each conversation, fetch the latest message.
      const withMessage = getMessages(json);
      return withMessage;
    }

    return fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        return json;
      });
  };

  const { user } = useAuth();

  const {
    data: conversations,
    error,
    mutate,
  } = useSWR(
    [
      `${process.env.REACT_APP_SERVER}/users/${user?._id}/conversations`,
      sessionStorage.getItem("jwt"),
    ],
    fetcher
  );

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
  const handleConversation = () => {
    mutate();
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
      !conversations.find(
        (conversation) => conversation._id === message.conversation
      )
    ) {
      mutate((prev) => {
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
      }, false);
    }
  };

  useEffect(() => {
    socket.on("insert conversation", handleConversation);
    socket.on("insert message", handleWithMessage);
    return () => {
      socket.off("insert conversation", handleConversation);
      socket.off("insert message", handleWithMessage);
    };
  }, [conversations]);

  return {
    conversations,
    error,
  };
}

export default useConversations;
