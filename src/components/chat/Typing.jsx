import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useTyping from "../../hooks/chat/useTyping";
import { useAuth } from "../../context/AuthContext";

function Typing({ location }) {
  const { typing } = useTyping(location);
  const { user } = useAuth();

  /**
   * @param {Array} users (array of {string})
   * @returns {string} - Message to be displayed.
   */
  const displayTyping = (users) => {
    // If there are less than three users, display their names.
    if (users.length === 1) {
      return `${users[0]} is typing...`;
    }

    if (users.length <= 3 && users.length > 0) {
      return `
          ${users.map((user, index) => {
            if (index === 0) {
              return user;
            }
            return ` ${user}`;
          })}
           are typing...
          `;
    }

    // If there are more than three users, display
    // "Several users are typing..."
    if (users.length > 3) {
      return "Several people are typing...";
    }
  };

  return (
    <Container>
      {displayTyping(
        Array.from(typing).filter((username) => username !== user.username)
      )}
    </Container>
  );
}

export default Typing;

Typing.propTypes = {
  location: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.text_tertiary};
`;
