import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/chat/Header";
import Messages from "../../components/chat/Messages";
import Form from "../../components/chat/form/Form";
import useMessage from "../../hooks/chat/useMessage";
import useFetch from "../../hooks/shared/useFetch";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";
import useActivity from "../../hooks/chat/useActivity";
import Typing from "../../components/chat/Typing";
import socket from "../../socket/socket";

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
      setTimeout(() => handleReadChannel(serverId, channelId), 3000);
    }
  }, [channel]);

  // On unmount, update the activity.
  useEffect(() => {
    return () =>
      serverId && channelId && updateChannelActivity(user, serverId, channelId);
  }, [channelId]);

  // On close, update the activity.
  useEffect(() => {
    const updateActivity = () => {
      if (!serverId || !channelId) return;
      const body = JSON.stringify({
        server: serverId,
        channel: channelId,
      });
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        type: "application/json",
      };
      const blob = new Blob([body], headers);
      navigator.sendBeacon(
        `${process.env.REACT_APP_URL}/activity/${user._id}/servers`,
        blob
      );
    };

    document.addEventListener("visibilitychange", updateActivity);
    return () => {
      updateActivity();
      document.removeEventListener("visibilitychange", updateActivity);
    };
  }, [channelId]);

  // Join / leave the channel socket room
  useEffect(() => {
    if (channelId) {
      socket.emit("join room", channelId);
    }
    return () => socket.emit("leave room");
  }, [channelId]);

  return (
    <Container>
      {channel && <Header name={channel.name} description={channel.about} />}
      <Messages messages={messages} setEditing={setEditing} />
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
