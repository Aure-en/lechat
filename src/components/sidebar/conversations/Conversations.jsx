import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUnread } from "../../../context/UnreadContext";
import Conversation from "./Conversation";

function Conversations() {
  const [conversations, setConversations] = useState([]);
  const { unread } = useUnread();

  useEffect(() => {
    setConversations(
      unread.conversations.filter((conversation) => conversation.unread > 0)
    );
    console.log("CONVERSATIONS UNREAD", unread.conversations);
    console.log("CONVERSATIONS", conversations);
  }, [unread]);

  return (
    <Ul>
      {conversations &&
        conversations.map((conversation) => {
          const friend = conversation.members.find(
            (user) => user._id !== JSON.parse(localStorage.getItem("user"))._id
          );
          return <Conversation conversation={conversation} friend={friend} />;
        })}
    </Ul>
  );
}

export default Conversations;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  & > li {
    margin-bottom: 0.5rem;
  }
`;