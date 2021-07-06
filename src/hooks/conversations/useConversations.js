import { useState, useEffect } from "react";

function useConversations() {
  const [conversations, setConversations] = useState([]);
  const [withMessage, setWithMessage] = useState([]);

  // Load conversations
  const getConversations = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/conversations`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    const json = await res.json();
    if (!json.error) setConversations(json);
  };

  useEffect(() => {
    getConversations();
  }, []);

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
          `${process.env.REACT_APP_URL}/conversations/${id}/messages?limit=1`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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

    setWithMessage(withMessage);
  };

  useEffect(() => {
    getMessages();
  }, [conversations]);

  return {
    withMessage,
  };
}

export default useConversations;
