import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

function Conversation({ conversation, friend }) {
  return (
    <>
      <Li>
        <Link
          to={`/conversations/${friend._id}`}
          data-tip={friend.username}
          data-offset="{'top': 16, 'right': 4}"
          data-for="friend"
        >
          {friend.avatar ? (
            <Avatar
              src={`data:${friend.avatar.contentType};base64,${Buffer.from(
                friend.avatar.data
              ).toString("base64")}`}
              alt={friend.username}
            />
          ) : (
            <Default>{friend.username[0]}</Default>
          )}
          <Number aria-label="unread">
            {conversation.unread > 9 ? "9+" : conversation.unread}
          </Number>
        </Link>
      </Li>

      <ReactTooltip place="right" effect="solid" id="friend" />
    </>
  );
}

export default Conversation;

Conversation.propTypes = {
  conversation: PropTypes.shape({
    _id: PropTypes.string,
    unread: PropTypes.number,
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

const Li = styled.li`
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const Number = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.send_bg};
  color: ${(props) => props.theme.bg_secondary};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 400;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.text_primary};
  font-size: 1.5rem;
  border-radius: 50%;
`;
