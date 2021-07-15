import React from "react";
import styled from "styled-components";
import useTyping from "../../hooks/chat/useTyping";
import { useAuth } from "../../context/AuthContext";

function Typing() {
  const { typing } = useTyping();
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

    if (users.length <= 3) {
      return `
          ${users.map((user, index) => {
            if (index !== users.length - 1) {
              return `${user}, `;
            }
            return user;
          })}
           are typing...
          `;
    }

    // If there are more than three users, display
    // "Several users are typing..."
    if (users.length > 3) {
      return "Several people are typing";
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

const Container = styled.div``;
