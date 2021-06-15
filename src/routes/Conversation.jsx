import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "../components/chat/Form";
import Messages from "../components/chat/Messages";
import socket from "../socket/socket";

function Conversation({ match }) {
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState();
  const [editing, setEditing] = useState(false);

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

  // Get messages
  useEffect(() => {
    if (!conversation) return;
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/conversations/${conversation._id}/messages`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (!json.error) setMessages(json);
    })();
  }, [conversation]);

  // Set up socket listeners
  const handleInsert = (newMessage) => {
    setMessages([...messages, newMessage.document]);
  };

  const handleUpdate = (updated) => {
    // Doesn't update messages if we are the author
    // Messages was already updated instantaneously by the form handler.
    if (
      updated.document.author._id ===
      JSON.parse(localStorage.getItem("user"))._id
    )
      return;

    setMessages((prev) => {
      const update = [...prev].map((message) => {
        return message._id.toString() === updated.document._id
          ? updated.document
          : message;
      });
      return update;
    });
  };

  const handleDelete = (deleted) => {
    if (
      messages.findIndex((message) => message._id === deleted.document._id) !==
      -1
    ) {
      setMessages((prev) =>
        prev.filter((message) => message._id !== deleted.document._id)
      );
    }
  };

  useEffect(() => {
    socket.on("insert", (document) => {
      handleInsert(document);
    });
    return () => socket.off("insert");
  }, [messages]);

  useEffect(() => {
    socket.on("update", (document) => {
      handleUpdate(document);
    });
    return () => socket.off("update");
  }, [messages]);

  useEffect(() => {
    socket.on("delete", (document) => {
      handleDelete(document);
    });
    return () => socket.off("delete");
  }, [messages]);

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
