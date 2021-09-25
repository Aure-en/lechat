import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "../components/chat/Header";
import Form from "../components/chat/form/Form";
import Loading from "../components/chat/Loading";
import Messages from "../components/chat/Messages";
import Profile from "../components/user/Profile";
import Typing from "../components/chat/Typing";
import { useAuth } from "../context/AuthContext";
import { PermissionProvider } from "../context/PermissionContext";
import useConversation from "../hooks/conversations/useConversation";
import useWindowSize from "../hooks/shared/useWindowSize";
import useMessage from "../hooks/chat/useMessage";
import NotFound from "../components/error/NotFound";

function Conversation({ match }) {
  const { user } = useAuth();
  const { editing, setEditing, conversation, loading } = useConversation(
    match.params.userId
  );
  const { ordered, getPrevious, setMessages, isLoading } = useMessage({
    conversation: conversation?._id,
  });
  const { windowSize } = useWindowSize();

  if (conversation) {
    return (
      <PermissionProvider location={{ conversation: conversation._id }}>
        <Container>
          {isLoading && <Loading />}
          <Header
            /* Display username of the conversation member who isn't the current one */
            name={
              conversation.members.find(
                (member) => member._id.toString() !== user._id
              ).username
            }
            location={{ conversation: conversation._id }}
          />

          <Messages
            ordered={ordered}
            getPrevious={getPrevious}
            setEditing={setEditing}
          />

          <Form
            location={{ conversation: conversation._id }}
            message={editing}
            setEditing={setEditing}
            setMessages={setMessages}
            isLoading={isLoading}
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
      </PermissionProvider>
    );
  }

  if (!loading && !conversation) {
    return <NotFound />;
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
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto 1.25rem;
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 1rem;
  height: 100vh; // margin-top
  min-height: -webkit-fill-available;
  overflow: hidden;
  flex: 1;

  @media all and (min-width: 768px) {
    margin: 1rem 1rem 0 0;
    height: calc(100vh - 1rem); // margin-top
    border-radius: 1rem 1rem 0 0;
  }
`;
