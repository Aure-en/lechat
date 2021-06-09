import React, { useState } from "react";
import PropTypes from "prop-types";
import Messages from "../components/chat/Messages";
import Form from "../components/chat/Form";

function Channel({ channelId }) {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <div>Channel {channelId}</div>
      <Messages channelId={channelId} setEditing={setEditing} />
      <Form channelId={channelId} message={editing} />
    </div>
  );
}

export default Channel;

Channel.propTypes = {
  channelId: PropTypes.string.isRequired,
};
