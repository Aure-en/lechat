import { useState, useEffect } from "react";
import { useUnread } from "../../context/UnreadContext";

function useConversations() {
  const [conversations, setConversations] = useState([]);
  const [number, setNumber] = useState(0);
  const { unread } = useUnread();

  useEffect(() => {
    if (!unread) return;
    setConversations(
      unread.conversations.filter((conversation) => conversation.unread > 0)
    );
  }, [unread]);

  useEffect(() => {
    setNumber(
      conversations.reduce((sum, conversation) => sum + conversation.unread, 0)
    );
  }, [conversations]);

  return {
    conversations,
    number,
  };
}

export default useConversations;
