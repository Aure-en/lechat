import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../components/chat/form/Form";
import Messages from "../components/chat/Messages";
import { useAuth } from "../context/AuthContext";
import { useUnread } from "../context/UnreadContext";
import useConversation from "../hooks/chat/useConversation";
import useMessage from "../hooks/chat/useMessage";
import useActivity from "../hooks/chat/useActivity";
import Profile from "../components/user/Profile";
import Typing from "../components/chat/Typing";
import socket from "../socket/socket";

function Conversation({ match }) {
  const [editing, setEditing] = useState(false);
  const { conversation } = useConversation(match.params.userId);
  const { messages, setMessages } = useMessage(
    conversation && { conversation: conversation._id }
  );
  const { user } = useAuth();
  const { handleReadConversation } = useUnread();
  const { updateConversationActivity } = useActivity();

  // On mount, set the conversation as read.
  useEffect(() => {
    if (conversation)
      setTimeout(() => handleReadConversation(conversation._id), 3000);
  }, [conversation]);

  // On unmount, update the activity
  useEffect(() => {
    return () =>
      conversation && updateConversationActivity(user, conversation._id);
  }, [conversation]);

  // Join / leave the channel socket room
  useEffect(() => {
    if (conversation) {
      socket.emit("join room", conversation._id);
    }
    return () => socket.emit("leave room");
  }, [conversation]);

  // On close, update the activity
  useEffect(() => {
    const updateActivity = () => {
      if (!conversation) return;
      const body = JSON.stringify({
        conversation: conversation._id,
      });
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        type: "application/json",
      };
      const blob = new Blob([body], headers);
      navigator.sendBeacon(
        `${process.env.REACT_APP_URL}/activity/${user._id}/conversations`,
        blob
      );
    };

    document.addEventListener("visibilitychange", updateActivity);
    return () => {
      updateActivity();
      document.removeEventListener("visibilitychange", updateActivity);
    };
  }, [conversation]);

  if (conversation) {
    return (
      <>
        <Container>
          <Header>
            <Heading>
              {/* Display username of the conversation member who isn't the current one */}
              {
                conversation.members.find(
                  (member) => member._id.toString() !== user._id
                ).username
              }
            </Heading>
          </Header>

          <Messages messages={messages} setEditing={setEditing} />
          <Form
            location={{ conversation: conversation._id }}
            message={editing}
            setEditing={setEditing}
            setMessages={setMessages}
          />
          <Typing location={conversation._id} />
        </Container>

        <Profile
          user={conversation.members.find(
            (member) => member._id.toString() !== user._id
          )}
        />
      </>
    );
  }

  return <></>;
}

export default Conversation;

Conversation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }).isRequired,
};

const Container = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto 1.25rem;
  background: ${(props) => props.theme.bg_secondary};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  margin-right: 1rem;
  height: calc(100vh - 1rem);
`;

const Header = styled.header`
  position: relative;
  padding: 2rem 2rem 1rem 2rem;
`;

const Heading = styled.h1`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
`;
