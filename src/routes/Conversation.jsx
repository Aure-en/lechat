import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../components/chat/form/Form";
import Messages from "../components/chat/Messages";
import Profile from "../components/user/Profile";
import Typing from "../components/chat/Typing";
import { useAuth } from "../context/AuthContext";
import useConversation from "../hooks/conversations/useConversation";
import useWindowSize from "../hooks/shared/useWindowSize";

function Conversation({ match }) {
  const { user } = useAuth();
  const {
    editing,
    setEditing,
    conversation,
    messages,
    setMessages,
    messagesRef,
  } = useConversation(match.params.userId);
  const windowSize = useWindowSize();

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

          <Messages
            messages={messages}
            setEditing={setEditing}
            messagesRef={messagesRef}
          />
          <Form
            location={{ conversation: conversation._id }}
            message={editing}
            setEditing={setEditing}
            setMessages={setMessages}
          />
          <Typing location={conversation._id} />
        </Container>

        {windowSize.width > 1400 && (
          <Profile
            user={conversation.members.find(
              (member) => member._id.toString() !== user._id
            )}
          />
        )}
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
