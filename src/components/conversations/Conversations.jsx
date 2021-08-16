import React, { useState } from "react";
import styled from "styled-components";
import useConversations from "../../hooks/conversations/useConversations";
import IconChevron from "../../assets/icons/general/IconChevron";
import Conversation from "./Conversation";

function Conversations() {
  const [isOpen, setIsOpen] = useState(true);
  const { withMessage: conversations } = useConversations();

  if (!conversations) {
    return <></>;
  }

  return (
    <Container>
      <Header type="button" onClick={() => setIsOpen(!isOpen)}>
        Latest conversations
        <Icon $open={isOpen}>
          <IconChevron />
        </Icon>
      </Header>

      {isOpen && (
        <Ul>
          {conversations.map((conversation) => (
            <Conversation conversation={conversation} key={conversation._id} />
          ))}
        </Ul>
      )}
    </Container>
  );
}

export default Conversations;

const Container = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Ul = styled.ul`
  overflow-y: auto;
  padding-right: 0.2rem;
  margin-right: 0.15rem;
  padding-left: 1rem;

  @media all and (min-width: 768px) {
    margin-right: 0.3rem;
  }

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 0.25rem 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }

  & > li {
    margin-bottom: 0.4rem;
    padding-right: 0.5rem;
  }

  & > li:last-child {
    margin-bottom: 0;
  }
`;

const Header = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.text_tertiary};
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0 1.5rem 0.5rem 1.5rem;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 0.5rem 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_primary};
  }
`;

const Icon = styled.span`
  line-height: 0;
  transform: ${(props) => !props.$open && "rotate(90deg)"};
  transition: transform 0.3s linear;
`;
