import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../components/chat/form/Form";
import Messages from "../components/chat/Messages";
import useConversation from "../hooks/chat/useConversation";
import useMessage from "../hooks/chat/useMessage";
import useActivity from "../hooks/chat/useActivity";

function Conversation({ match }) {
  const [editing, setEditing] = useState(false);
  const { conversation } = useConversation(match.params.userId);
  const { messages, setMessages } = useMessage(
    conversation &&
      `${process.env.REACT_APP_URL}/conversations/${conversation._id}/messages`
  );
  const { updateConversationActivity } = useActivity();

  // On unmount, update the activity.
  useEffect(() => {
    () => conversation && updateConversationActivity(conversation._id);
  }, [conversation]);

  return (
    <>
      {conversation && (
        <Container>
          <Header>
            <Heading>
              {/* Display username of the conversation member who isn't the current one */}
              {
                conversation.members.filter(
                  (member) =>
                    member._id.toString() !==
                    JSON.parse(localStorage.getItem("user"))._id
                )[0].username
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
      )}
    </>
  );
}

export default Conversation;

Conversation.propTypes = {
  match: PropTypes.shape.isRequired,
};

const Container = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
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
