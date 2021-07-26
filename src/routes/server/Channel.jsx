import React from "react";
import styled from "styled-components";
import Header from "../../components/chat/Header";
import Messages from "../../components/chat/Messages";
import Form from "../../components/chat/form/Form";
import Typing from "../../components/chat/Typing";
import useChannel from "../../hooks/server/channel/useChannel";

function Channel() {
  const {
    editing,
    setEditing,
    messages,
    setMessages,
    serverId,
    channelId,
    channel,
    messagesRef,
  } = useChannel();

  return (
    <Container>
      {channel && <Header name={channel.name} description={channel.about} />}
      <Messages
        messages={messages}
        setEditing={setEditing}
        messagesRef={messagesRef}
      />
      {serverId && channelId && (
        <>
          <Form
            location={{ server: serverId, channel: channelId }}
            message={editing}
            setEditing={setEditing}
            setMessages={setMessages}
          />
          <Typing location={channelId} />
        </>
      )}
    </Container>
  );
}

export default Channel;

const Container = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto 1.25rem;
  background: ${(props) => props.theme.bg_secondary};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  height: calc(100vh - 1rem); // margin-top
  overflow: hidden;
`;
