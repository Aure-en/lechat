import React from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import Header from "../../components/chat/Header";
import Messages from "../../components/chat/Messages";
import Form from "../../components/chat/form/Form";
import Typing from "../../components/chat/Typing";
import useChannel from "../../hooks/server/channel/useChannel";

function Channel() {
  const { serverId, channelId } = useRouteMatch(
    "/servers/:serverId/channels/:channelId"
  ).params;
  const { editing, setEditing, channel } = useChannel(serverId, channelId);

  return (
    <Container>
      {channel && (
        <Header
          name={channel.name}
          description={channel.about}
          location={{ channel: channelId }}
        />
      )}
      <Messages
        location={{ server: serverId, channel: channelId }}
        setEditing={setEditing}
      />

      {serverId && channelId && (
        <>
          <Form
            location={{ server: serverId, channel: channelId }}
            message={editing}
            setEditing={setEditing}
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
  border-radius: 1rem;
  height: 100vh; // margin-top
  overflow: hidden;
  flex: 1;

  @media all and (min-width: 768px) {
    margin: 1rem 1rem 0 1rem;
    height: calc(100vh - 1rem); // margin-top
    border-radius: 1rem 1rem 0 0;
  }
`;
