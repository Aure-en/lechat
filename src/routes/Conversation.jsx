import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "../components/chat/Form";
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
        <>
          <div>
            Conversation:{" "}
            {conversation.members.map((member) => member.username)}
          </div>

          <Messages messages={messages} setEditing={setEditing} />
          <Form
            conversationId={conversation._id}
            message={editing}
            setEditing={setEditing}
            setMessages={setMessages}
          />
        </>
      )}
    </>
  );
}

export default Conversation;

Conversation.propTypes = {
  match: PropTypes.shape.isRequired,
};
