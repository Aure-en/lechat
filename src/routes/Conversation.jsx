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

function Conversation({ match }) {
  const [editing, setEditing] = useState(false);
  const { conversation } = useConversation(match.params.userId);
  const { messages, setMessages } = useMessage(
    conversation &&
      `${process.env.REACT_APP_URL}/conversations/${conversation._id}/messages`
  );
  const { user } = useAuth();
  const { updateConversationActivity } = useActivity();
  const { handleReadConversation } = useUnread();

  // On mount, set the conversation as read.
  useEffect(() => {
    conversation && handleReadConversation(conversation._id);
  }, [conversation]);

  // On unmount or on close, update the activity
  useEffect(() => {
    const updateActivity = () =>
      conversation && updateConversationActivity(user, conversation._id);
    window.addEventListener("unload", updateActivity);
    return () => {
      updateActivity();
      window.removeEventListener("unload", updateActivity);
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
            conversationId={conversation._id}
            message={editing}
            setEditing={setEditing}
            setMessages={setMessages}
          />
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
  grid-template-rows: auto 1fr auto;
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
