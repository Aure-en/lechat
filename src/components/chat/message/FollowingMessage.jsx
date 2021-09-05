import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "./component/Text";
import Timestamp from "./component/Timestamp";
import More from "../More";
import Files from "../files/Files";
import IconLoad from "../../../assets/icons/general/IconLoad";

/**
 * Not the first message of a group of message.
 * - Does not display the author information.
 * - Only displays the timestamp on hover.
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
      {hovered && (
        <Time>
          <Timestamp timestamp={message.timestamp} />
        </Time>
      )}

      {/* Text */}
      <Text text={message.text} editer={message.edited} />

      {/* If the message contains files that are currently being uploaded to
          the BDD, display a loader */}
      {message.loading && (
        <Load>
          <IconLoad />
        </Load>
      )}

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
  padding-left: 4.5rem; // Avatar width (2.5) + distance to text (1) + padding left (1).
  padding-right: 1rem;
  background: ${(props) => props.$hovered && props.theme.chat_bg_hover};
`;

const Time = styled.span`
  position: absolute;
  left: 1.25rem;
`;

const Load = styled.div`
  grid-column: 2;
`;
