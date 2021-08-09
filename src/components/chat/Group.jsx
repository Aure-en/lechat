import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "./Message";
import New from "./New";

/**
 * Group of messages written by the same author at around the same timestamp.
 */
function Group({ messages, setEditing }) {
  return (
    <Li>
      {messages.messages.map((message, index) => (
        <React.Fragment key={message._id || message.tempId}>
          {message.unread && <New />}
          <Message
            message={message}
            isFirst={index === 0}
            setEditing={setEditing}
          />
        </React.Fragment>
      ))}
    </Li>
  );
}

export default Group;

Group.propTypes = {
  messages: PropTypes.shape({
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
      })
    ),
  }).isRequired,
  setEditing: PropTypes.func,
};

Group.defaultProps = {
  setEditing: () => {},
};

const Li = styled.li`
  display: flex;
  flex-direction: column;
  line-height: 1.5rem;
  padding: 0;

  & > div:last-child {
    margin-bottom: 0.5rem;
  }
`;
