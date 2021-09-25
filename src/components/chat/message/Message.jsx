import React from "react";
import PropTypes from "prop-types";
import FirstMessage from "./FirstMessage";
import FollowingMessage from "./FollowingMessage";

function Message({ message, isFirst, setEditing }) {
  // First message displays the author's avatar, username and timestamp.
  if (isFirst) {
    return <FirstMessage message={message} setEditing={setEditing} />;
  }
  return <FollowingMessage message={message} setEditing={setEditing} />;
}

export default React.memo(Message);

Message.propTypes = {
  message: PropTypes.shape({
    timestamp: PropTypes.number,
    text: PropTypes.string,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
      })
    ),
    author: PropTypes.shape({
      username: PropTypes.string,
      _id: PropTypes.string,
      avatar: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
      }),
    }),
    loading: PropTypes.bool, // True if message has files that have to be uploaded to the BD.
    edited: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
  isFirst: PropTypes.bool,
  setEditing: PropTypes.func,
};

Message.defaultProps = {
  isFirst: false,
  setEditing: () => {},
};
