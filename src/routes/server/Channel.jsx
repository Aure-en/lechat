import React from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import Header from "../../components/chat/Header";
import Messages from "../../components/chat/Messages";
import Form from "../../components/chat/form/Form";
import Typing from "../../components/chat/Typing";
import NotFound from "../../components/error/NotFound";
import useChannel from "../../hooks/server/channel/useChannel";
import useMessage from "../../hooks/chat/useMessage";

function Channel() {
  const { serverId, channelId } = useRouteMatch(
    "/servers/:serverId/channels/:channelId"
  ).params;
  const { ordered, getPrevious, setMessages } = useMessage({
    server: serverId,
    channel: channelId,
  });
  const { editing, setEditing, channel, loading } = useChannel(
    serverId,
    channelId
  );

  if (channel) {
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
          ordered={ordered}
          getPrevious={getPrevious}
          setEditing={setEditing}
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

  if (!loading && !channel) {
    return <NotFound />;
  }

  return <></>;
}

export default Channel;

const Container = styled.main`
  display: grid;
  grid-template-rows: auto 1fr auto 1.25rem;
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 1rem;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
  flex: 1;

  @media all and (min-width: 768px) {
    margin: 1rem 1rem 0 0;
    height: calc(100vh - 1rem); // margin-top
    border-radius: 1rem 1rem 0 0;
  }
`;
