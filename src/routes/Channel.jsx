import React from "react";
import PropTypes from "prop-types";
import Messages from "../components/chat/Messages";
import Form from "../components/chat/Form";

function Channel({ channelId }) {
  return (
    <div>
      <div>Channel {channelId}</div>
      <Messages channelId={channelId} />
      <Form channelId={channelId} />
    </div>
  );
}

export default Channel;

Channel.propTypes = {
  channelId: PropTypes.string.isRequired,
};
