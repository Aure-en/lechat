import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import redraft from "redraft";
import renderers from "./convert/renderers";
import Timestamp from "./Timestamp";
import More from "./More";
import Content from "./Content";
import Files from "./files/Files";
import IconLoad from "../../assets/icons/general/IconLoad";

function Message({ message, isFirst, setEditing }) {
  const [hovered, setHovered] = useState(false);
  const [more, setMore] = useState(false);

  // First message displays the author's avatar, username and timestamp.
  if (isFirst) {
    return (
      <First
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        $hovered={hovered}
      >
        <Content message={message} />

        {/* If the message contains files that are currently being uploaded to
        the BDD, display a loader */}
        {message.loading && <IconLoad />}

        {(hovered || more) && (
          <More
            message={message}
            setEditing={setEditing}
            setIsActive={setMore}
          />
        )}
      </First>
    );
  }

  // Other messages only display the content.
  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      $isFirst={isFirst}
      $hovered={hovered}
    >
      {!isFirst && hovered && (
        <Time>
          <Timestamp timestamp={message.timestamp} />
        </Time>
      )}

      {/* Text */}
      {!(
        JSON.parse(message.text)?.blocks.length === 1 &&
        !JSON.parse(message.text)?.blocks[0].text
      ) && (
        <div>
          {redraft(JSON.parse(message.text), renderers)}
          {message.edited && <Edited>(edited)</Edited>}
        </div>
      )}

      {/* If the message contains files that are currently being uploaded to
      the BDD, display a loader */}
      {message.loading && <IconLoad />}

      {/* Files */}
      {message.files?.length > 0 && (
        <Files files={message.files} message={message} />
      )}

      {/* More, on hover */}
      {(hovered || more) && (
        <More message={message} setEditing={setEditing} setIsActive={setMore} />
      )}
    </Container>
  );
}

// Used React.memo to prevent all <Message> from re-rendering
// whenever a message is inserted / updated / deleted.
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
