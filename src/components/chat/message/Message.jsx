import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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

const First = styled.div`
  position: relative;
  display: grid;
  grid-template: repeat(2, auto) / auto 1fr;
  grid-column-gap: 1rem;
  background: ${(props) => props.$hovered && props.theme.chat_bg_hover};
  padding: 0 1rem;
  margin-top: 0.5rem;
`;

const Container = styled.div`
  position: relative;
  padding-left: ${(props) =>
    !props.$isFirst &&
    "4.5rem"}; // Avatar width (2.5) + distance to text (1) + padding left (1).
  padding-right: 1rem;
  background: ${(props) => props.$hovered && props.theme.chat_bg_hover};
`;

const Time = styled.span`
  position: absolute;
  left: 1.25rem;
`;

const Edited = styled.small`
  margin-left: 0.25rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.text_secondary};
`;

const Load = styled.div`
  grid-column: 2;
`;
