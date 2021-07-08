import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Conversation({ conversation, friend }) {
  return (
    <li key={conversation._id}>
      <Link to={`/conversations/${friend._id}`}>
        {friend.avatar ? (
          <Icon
            src={`data:${friend.avatar.contentType};base64,${Buffer.from(
              friend.avatar.data
            ).toString("base64")}`}
            alt={friend.username}
          />
        ) : (
          <Default>{friend.username[0]}</Default>
        )}
      </Link>
    </li>
  );
}

export default Conversation;

Conversation.propTypes = {
  conversation: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  friend: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.shape({
      contentType: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }).isRequired,
};

const Icon = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;
