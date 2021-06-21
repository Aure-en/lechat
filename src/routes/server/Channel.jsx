import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Messages from "../../components/chat/Messages";
import Form from "../../components/chat/Form";
import useMessage from "../../hooks/chat/useMessage";
import useFetch from "../../hooks/shared/useFetch";

function Channel() {
  const { channelId } = useRouteMatch(
    "/servers/:serverId/channels/:channelId"
  ).params;
  const { data: channel } = useFetch(
    `${process.env.REACT_APP_URL}/channels/${channelId}`
  );
  const [editing, setEditing] = useState();
  const { messages, setMessages } = useMessage(
    channelId && `${process.env.REACT_APP_URL}/channels/${channelId}/messages`
  );

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <Container>
      {channel && <div>{channel.name}</div>}
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
  grid-template-rows: auto 1fr auto;
  background: ${(props) => props.theme.bg_chat};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
`;
