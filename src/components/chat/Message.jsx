import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import redraft from "redraft";
import renderers from "./convert/renderers";
import Timestamp from "./Timestamp";
import More from "./More";
import Content from "./Content";

function Message({ message, isFirst, setEditing }) {
  const [hovered, setHovered] = useState(false);
  const [more, setMore] = useState(false);

  if (isFirst) {
    return (
      <First
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        $hovered={hovered}
      >
        <Content message={message} />

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
      <div>{redraft(JSON.parse(message.text), renderers)}</div>
      {(hovered || more) && (
        <More message={message} setEditing={setEditing} setIsActive={setMore} />
      )}
    </Container>
  );
}

export default Message;

Message.propTypes = {
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
`;

const Information = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: 400;
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
