import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUnread } from "../../../context/UnreadContext";

function Conversation() {
  const [conversations, setConversations] = useState([]);
  const { unread } = useUnread();

  useEffect(() => {
    setConversations(
      unread.conversations.filter((conversation) => conversation.unread > 0)
    );
    console.log(conversations);
  }, [unread]);

  return (
    <Ul>
      {/* {conversations &&
        conversations.map((conversation) => {
          const friend = conversation.members.find(
            (user) => user._id !== JSON.parse(localStorage.getItem("user"))._id
          );

          return (
            <li key={conversation._id}>
              <Link to={`/conversations/${friend._id}`}>
                {friend.avatar ? (
                  <Icon
                    src={`data:${
                      friend.avatar.contentType
                    };base64,${Buffer.from(friend.avatar.data).toString(
                      "base64"
                    )}`}
                    alt={friend.username}
                  />
                ) : (
                  <Default>{friend.username[0]}</Default>
                )}
              </Link>
            </li>
          );
        })} */}
    </Ul>
  );
}

export default Conversation;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

  & > li {
    margin-bottom: 0.5rem;
  }
`;

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
