import React from "react";
import styled from "styled-components";
import NavLink from "./NavLink";
import usePending from "../../../hooks/friends/usePending";
import { ReactComponent as IconFriends } from "../../../assets/icons/nav/users.svg";

function Friends() {
  const { incomingRequests } = usePending();

  return (
    <NavLink to="/" tip="Friends">
      <Container>
        <IconFriends />
        {incomingRequests.length > 0 && (
          <Number>
            {incomingRequests.length > 9 ? "9+" : incomingRequests.length}
          </Number>
        )}
      </Container>
    </NavLink>
  );
}

export default Friends;

const Container = styled.span`
  display: block;
  position: relative;
`;

const Number = styled.span`
  position: absolute;
  right: -0.25rem;
  bottom: 0;
  background: ${(props) => props.theme.send_bg};
  color: ${(props) => props.theme.bg_secondary};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 400;
`;
