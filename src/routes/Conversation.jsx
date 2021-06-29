import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../components/chat/form/Form";
import Messages from "../components/chat/Messages";
import useMessage from "../hooks/chat/useMessage";

function Conversation({ match }) {
  const [conversation, setConversation] = useState();
  const [editing, setEditing] = useState(false);
  const { messages, setMessages } = useMessage(
    conversation &&
      `${process.env.REACT_APP_URL}/conversations/${conversation._id}/messages`
  );

  // Load conversation
  useEffect(() => {
    (async () => {
      // Check conversation existence
      const existRes = await fetch(
        `${process.env.REACT_APP_URL}/conversations?members=${
          match.params.userId
        },${JSON.parse(localStorage.getItem("user"))._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const exist = await existRes.json();
      let conversation = exist;

      // If the conversation does not exist, create it.
      if (!exist) {
        const createRes = await fetch(
          `${process.env.REACT_APP_URL}/conversations`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              members: `["${match.params.userId}","${
                JSON.parse(localStorage.getItem("user"))._id
              }"]`,
            }),
          }
        );
        const create = await createRes.json();
        conversation = create;
      }

      // Set the conversation.
      setConversation(conversation);
    })();
  }, [match]);

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
                    member._id.toString !==
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
