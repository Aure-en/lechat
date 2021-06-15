import React, { useState } from "react";
import PropTypes from "prop-types";
import Messages from "../../components/chat/Messages";
import Form from "../../components/chat/Form";
import useMessage from "../../hooks/useMessage";

function Channel({ channelId }) {
  const [editing, setEditing] = useState(false);
  const { messages, setMessages } = useMessage(
    `${process.env.REACT_APP_URL}/channels/${channelId}/messages`
  );

  return (
    <div>
      <div>Channel {channelId}</div>
      <Messages messages={messages} setEditing={setEditing} />
      <Form
        message={editing}
        setEditing={setEditing}
        setMessages={setMessages}
      />
    </div>
  );
}

export default Channel;

Channel.propTypes = {
  channelId: PropTypes.string.isRequired,
};
