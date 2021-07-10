import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useUnread } from "../../../context/UnreadContext";
import useDropdown from "../../../hooks/shared/useDropdown";
import Conversation from "./Conversation";
import Empty from "./Empty";
import { ReactComponent as IconChat } from "../../../assets/icons/nav/chat.svg";

function Conversations() {
  const ref = useRef(); // For dropdown
  const [conversations, setConversations] = useState([]);
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);
  const { unread } = useUnread();

  useEffect(() => {
    setConversations(
      unread.conversations.filter((conversation) => conversation.unread > 0)
    );
    console.log("CONVERSATIONS UNREAD", unread.conversations);
    console.log("CONVERSATIONS", conversations);
  }, [unread]);

  return (
    <Container $position={conversations.length > 0} ref={ref}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        data-tip="Conversations"
        data-for="nav"
        data-offset={"{'top': 16, 'right': -15}"}
      >
        <IconChat />
      </button>

      {isDropdownOpen && (
        <>
          {conversations.length > 0 ? (
            <Ul>
              {conversations.map((conversation) => {
                const friend = conversation.members.find(
                  (user) =>
                    user._id !== JSON.parse(localStorage.getItem("user"))._id
                );
                return (
                  <Conversation conversation={conversation} friend={friend} />
                );
              })}
            </Ul>
          ) : (
            <Empty close={setIsDropdownOpen} />
          )}
        </>
      )}
    </Container>
  );
}

export default Conversations;

const Container = styled.div`
  position: ${(props) =>
    !props.$position && "relative"}; // Position bubble properly
`;

const Ul = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-radius: 0 1rem 1rem 0;
  top: 0;
  bottom: 0;
  left: calc(100% - 1rem);
  background: ${(props) => props.theme.bg_secondary};
  min-width: 5rem;
  padding: 0.75rem 0;

  // Put the panel under the sidebar
  transform: translateZ(-10px);

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
