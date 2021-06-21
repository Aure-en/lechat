import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Messages from "../../components/chat/Messages";
import Form from "../../components/chat/Form";
import useMessage from "../../hooks/chat/useMessage";

function Channel() {
  const { channelId } = useRouteMatch(
    "/servers/:serverId/channels/:channelId"
  ).params;
  const [editing, setEditing] = useState(false);
  const { messages, setMessages } = useMessage(
    channelId && `${process.env.REACT_APP_URL}/channels/${channelId}/messages`
  );

  return (
    <Container>
      <Messages messages={messages} setEditing={setEditing} />
      <Form
        message={editing}
        setEditing={setEditing}
        setMessages={setMessages}
      />
    </Container>
  );
}

export default Channel;

const Container = styled.main`
  display: grid;
  grid-template-rows: 1fr auto;
`;
