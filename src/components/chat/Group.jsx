import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "./Message";

function Group({ messages, setEditing }) {
  return (
    <Li>
      {messages.messages.map((message, index) => (
        <Message
          key={message._id}
          message={message}
          isFirst={index === 0}
          setEditing={setEditing}
        />
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
  margin: 1rem 0;
  line-height: 1.5rem;
  padding: 0;
`;
