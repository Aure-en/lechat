import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "./Message";
import Timestamp from "./Timestamp";

function Group({ messages, setEditing }) {
  const [hovered, setHovered] = useState(false);

  const remove = async (id) => {
    await fetch(`${process.env.REACT_APP_URL}/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Li>
      {/* Avatar */}
      {messages.author.avatar ? (
        <Icon
          src={`data:${messages.author.avatar.contentType};base64,${Buffer.from(
            messages.author.avatar.data
          ).toString("base64")}`}
          alt={messages.author.username}
        />
      ) : (
        <Default>{messages.author.username[0]}</Default>
      )}

      <div>
        {/* Author and date */}
        <Information>
          {messages.author.username}
          <Timestamp timestamp={messages.timestamp} isFirst />
        </Information>

        {/* Messages */}
        {messages.messages.map((message, index) => (
          <Message key={message._id} message={message} isFirst={index === 0} />
        ))}
      </div>
    </Li>
  );
}

export default Group;

const Li = styled.li`
  display: flex;
  margin: 1rem 0;

  & > *:first-child {
    margin-right: 1rem;
  }
`;

const Information = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.25rem;
  font-weight: 400;
`;

const Icon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.server_icon_bg};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;

const List = styled.div`
  line-height: 1.5rem;
`;
