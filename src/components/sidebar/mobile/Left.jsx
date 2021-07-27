import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useServers from "../../../hooks/server/server/useServers";
import { useUnread } from "../../../context/UnreadContext";
import ServersList from "../servers/List";
import ConversationsList from "../conversations/List";
import Create from "../../server/Modal";

function Left() {
  // For conversations
  const [conversations, setConversations] = useState([]);
  const { unread } = useUnread();

  // For servers
  const { servers } = useServers();

  useEffect(() => {
    if (!unread) return;
    setConversations(
      unread.conversations.filter((conversation) => conversation.unread > 0)
    );
  }, [unread]);

  return (
    <Container>
      <Ul>
        <ConversationsList conversations={conversations} />
      </Ul>

      <Ul>
        <ServersList servers={servers} />
      </Ul>
      <Create />
    </Container>
  );
}

export default Left;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-left: none;
  background: ${(props) => props.theme.bg_secondary};
  color: ${(props) => props.theme.text_tertiary};
  min-width: 4rem;
  padding: 0.75rem 0;
  height: 100vh;

  // Put the panel under the sidebar
  transform: translateZ(-10px);
`;

const Ul = styled.ul`
  list-style: none;

  & li {
    position: relative;
    margin-bottom: 0.5rem;
  }

  & li:hover:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: -0.5rem;
    border: 7px solid transparent;
    border-left: 7px solid ${(props) => props.theme.bg_sidebar};
    transform: translateY(-50%);
    opacity: 0.5;
  }

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }
`;
