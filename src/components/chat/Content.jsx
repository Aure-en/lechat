import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import redraft from "redraft";
import renderers from "./convert/renderers";
import Timestamp from "./Timestamp";

function Content({ message }) {
  return (
    <>
      {/* Avatar */}
      {message.author.avatar &&
      Object.keys(message.author.avatar).length > 0 ? (
        <Icon
          src={`data:${message.author.avatar.contentType};base64,${Buffer.from(
            message.author.avatar.data
          ).toString("base64")}`}
          alt={message.author.username}
        />
      ) : (
        <Default>{message.author.username[0]}</Default>
      )}

      {/* Author and date */}
      <Information>
        {message.author.username}
        <Timestamp timestamp={message.timestamp} isFirst />
      </Information>

      <div>
        {redraft(JSON.parse(message.text), renderers)}
        {message.edited && <Edited>(edited)</Edited>}
      </div>
    </>
  );
}

export default Content;

Content.propTypes = {
  message: PropTypes.shape({
    timestamp: PropTypes.number,
    text: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
      _id: PropTypes.string,
      avatar: PropTypes.shape({
        contentType: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
      }),
    }),
  }).isRequired,
};

const Information = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: 400;

  & > *:last-child {
    margin-left: 0.5rem;
  }
`;

const Icon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  grid-row: 1 / -1;
  margin-top: 3px;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1 / -1;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
  margin-top: 5px;
`;

const Edited = styled.small`
  font-size: 0.75rem;
  margin-left: .25rem;
  color: ${(props) => props.theme.text_secondary};
`;
