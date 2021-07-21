import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useUnread } from "../../../context/UnreadContext";
import { useAuth } from "../../../context/AuthContext";
import useDropdown from "../../../hooks/shared/useDropdown";
import Conversation from "./Conversation";
import Empty from "./Empty";
import { ReactComponent as IconChat } from "../../../assets/icons/nav/chat.svg";

function Conversations() {
  const ref = useRef(); // For dropdown
  const [conversations, setConversations] = useState([]);
  const [number, setNumber] = useState(0);
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);
  const { unread } = useUnread();
  const { user } = useAuth();

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

  return (
    <Container $position={conversations.length > 0} ref={ref}>
      <Button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        data-tip="Conversations"
        data-for="nav"
        data-offset={"{'top': 16, 'right': -15}"}
      >
        <IconChat />
        {number > 0 && <Number>{number > 9 ? "9+" : number}</Number>}
      </Button>

      {isDropdownOpen && (
        <>
          {conversations.length > 0 ? (
            <Ul>
              {conversations.map((conversation) => {
                const friend = conversation.members.find(
                  (member) => member._id !== user._id
                );
                return (
                  <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    friend={friend}
                  />
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
  padding-left: 1rem; // Compensate the extra 1rem overlapping with navbar.

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

const Button = styled.button`
  position: relative;

  &:hover:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: calc(-1rem - 1px);
    border: 8px solid transparent;
    border-left: 8px solid ${(props) => props.theme.sidebar_button};
    transform: translateY(-50%);
  }
`;

const Number = styled.span`
  position: absolute;
  right: -0.25rem;
  bottom: 0;
  background: ${(props) => props.theme.send_bg};
  color: ${(props) => props.theme.bg_secondary};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 400;
`;
