import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import redraft from "redraft";
import { useAuth } from "../../context/AuthContext";
import Timestamp from "../chat/Timestamp";
import renderers from "../chat/convert/renderers";

function Conversation({ conversation }) {
  const id =
    useRouteMatch("/conversations/:id") &&
    useRouteMatch("/conversations/:id").params.id;
  const { user } = useAuth();

  // Conversation member who is not the current user.
  const member = conversation.members.find((member) => member._id !== user._id);

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

        <Center>
          <div>{member.username}</div>
          <Text>
            {redraft(JSON.parse(conversation.message.text), renderers)}
          </Text>
        </Center>

        <Timestamp timestamp={conversation.message.timestamp} />
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

const Center = styled.div``;

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
