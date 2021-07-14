import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import redraft from "redraft";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";
import Timestamp from "../chat/Timestamp";
import renderers from "../chat/convert/renderers";

function Conversation({ conversation }) {
  const id =
    useRouteMatch("/conversations/:id") &&
    useRouteMatch("/conversations/:id").params.id;
  const { user } = useAuth();
  const { unread } = useUnread();
  const [unreadNumber, setUnreadNumber] = useState(0);

  const member = conversation.members.find((member) => member._id !== user._id);

  useEffect(() => {
    if (!unread) return;
    const conversationUnread = unread.conversations.find(
      (conv) => conversation._id === conv._id
    );
    const number = conversationUnread && conversationUnread.unread;
    setUnreadNumber(number);
  }, [unread]);

  return (
    <li>
      <StyledLink
        to={`/conversations/${member._id}`}
        $active={id === member._id}
      >
        {member.avatar && Object.keys(member.avatar).length > 0 ? (
          <Avatar
            src={`data:${member.avatar.contentType};base64,${Buffer.from(
              member.avatar.data
            ).toString("base64")}`}
            alt={member.username}
          />
        ) : (
          <Default>{member.username[0]}</Default>
        )}

        <div>
          <div>{member.username}</div>
          <Text>
            {redraft(JSON.parse(conversation.message.text), renderers)}
          </Text>
        </div>

        <Left>
          <Timestamp timestamp={conversation.message.timestamp} />
          {unreadNumber > 0 && (
            <Unread>{unreadNumber > 9 ? "9+" : unreadNumber}</Unread>
          )}
        </Left>
      </StyledLink>
    </li>
  );
}

export default Conversation;

Conversation.propTypes = {
  conversation: PropTypes.shape({
    members: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
      })
    ),
    message: PropTypes.shape({
      text: PropTypes.string,
      timestamp: PropTypes.number,
    }),
  }).isRequired,
};

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.2rem;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  margin-right: 0.2rem;
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  grid-gap: 0.5rem;
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.$active && props.theme.bg_active};

  &:hover {
    background: ${(props) => !props.$active && props.theme.bg_hover};
  }
`;

const Text = styled.div`
  & > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(100%);
    max-width: 100%;
    min-width: 0;
    background: none;
    font-family: "Assistant", sans-serif;
    font-size: 0.875rem;
    color: ${(props) => props.theme.text_secondary};
    line-height: 1;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Unread = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 400;
  width: 1rem;
  height: 1rem;
  background: ${(props) => props.theme.send_bg};
  color: ${(props) => props.theme.bg_secondary};
`;
