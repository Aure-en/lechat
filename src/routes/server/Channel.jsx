import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/chat/Header";
import Messages from "../../components/chat/Messages";
import Form from "../../components/chat/form/Form";
import useMessage from "../../hooks/chat/useMessage";
import useFetch from "../../hooks/shared/useFetch";
import useActivity from "../../hooks/chat/useActivity";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";

function Channel() {
  const { serverId, channelId } = useRouteMatch(
    "/servers/:serverId/channels/:channelId"
  ).params;
  const { data: channel } = useFetch(
    `${process.env.REACT_APP_URL}/channels/${channelId}`
  );
  const [editing, setEditing] = useState();
  const { messages, setMessages } = useMessage(
    channelId && { channel: channelId }
  );
  const { updateChannelActivity } = useActivity();
  const { handleReadChannel } = useUnread();
  const { user } = useAuth();

  useEffect(() => {
    if (channel) {
      // Store last visited channel to redirect the user to it later.
      localStorage.setItem(serverId, channelId);
      // Set the channel as read
      handleReadChannel(serverId, channelId);
    }
  }, [channel]);

  // On unmount or on close, update the activity.
  useEffect(() => {
    const updateActivity = () =>
      serverId && channelId && updateChannelActivity(user, serverId, channelId);
    window.addEventListener("onbeforeunload", updateActivity);
    return () => {
      updateActivity();
      window.removeEventListener("onbeforeunload", updateActivity);
    };
  }, [channelId]);

  return (
    <Container>
      {channel && <Header name={channel.name} description={channel.about} />}
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
  background: ${(props) => props.theme.bg_secondary};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  height: calc(100vh - 1rem); // margin-top
  overflow: hidden;
`;
