import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./message/component/Avatar";
import Text from "./message/component/Text";
import Timestamp from "./message/component/Timestamp";
import Files from "./files/Files";

function Content({ message }) {
  return (
    <>
      <Avatar
        avatar={message.author.avatar}
        username={message.author.username}
      />

      {/* Author and date */}
      <Information>
        {message.author.username}
        <Timestamp timestamp={message.timestamp} isFirst />
      </Information>

      {/* Text */}
      <Text text={message.text} editer={message.edited} />

      {/* Files */}
      {message.files?.length > 0 && (
        <Files files={message.files} message={message} />
      )}
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
        type: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
      }),
    }),
    files: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
      })
    ),
    edited: PropTypes.bool,
    _id: PropTypes.string,
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
