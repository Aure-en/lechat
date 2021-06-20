import React, { useState } from "react";
import styled from "styled-components";
import Timestamp from "./Timestamp";
import More from "./More";

function Message({ message, isFirst }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!isFirst && hovered && (
        <Time>
          <Timestamp timestamp={message.timestamp} />
        </Time>
      )}
      {message.text}
    </Container>
  );
}

export default Message;

const Container = styled.div`
  position: relative;
`;

const Time = styled.span`
  position: absolute;
  left: 0;
  transform: translateX(calc(-100% - 1rem));
`;
