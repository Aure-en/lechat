import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Author from "./component/Author";
import Avatar from "./component/Avatar";
import Text from "./component/Text";
import Timestamp from "./component/Timestamp";
import More from "../More";
import Files from "../files/Files";
import IconLoad from "../../../assets/icons/general/IconLoad";

/**
 * First message of a group of message.
 * Displays the author's informations and timestamp.
 */
function FirstMessage({ message, setEditing }) {
  const [hovered, setHovered] = useState(false);
  const [more, setMore] = useState(false);

  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $hovered={hovered}
    >
      <Avatar user={message.author} />

      {/* Author and date */}
      <Information>
        <Author user={message.author} />
        <Timestamp timestamp={message.timestamp} isFirst />
      </Information>

      {/* Text */}
      <Text text={message.text} edited={message.edited} />

      {/* Files */}
      {message.files?.length > 0 && (
        <Files files={message.files} message={message} />
      )}

      {/* If the message contains files that are currently being uploaded to
    the DB, display a loader */}
      {message.loading && (
        <Load>
          <IconLoad />
        </Load>
      )}

      {(hovered || more) && (
        <More message={message} setEditing={setEditing} setIsActive={setMore} />
      )}
    </Container>
  );
}

export default FirstMessage;

FirstMessage.propTypes = {
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
  setEditing: PropTypes.func,
};

FirstMessage.defaultProps = {
  setEditing: () => {},
};

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template: repeat(2, auto) / auto 1fr;
  grid-column-gap: 1rem;
  background: ${(props) => props.$hovered && props.theme.chat_bg_hover};
  padding: 0 1rem;
  margin-top: 0.5rem;
`;

const Information = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: 400;

  & > *:last-child {
    margin-left: 0.5rem;
  }
`;

const Load = styled.div`
  grid-column: 2;
`;
