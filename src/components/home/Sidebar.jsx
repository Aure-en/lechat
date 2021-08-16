import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import useWindowSize from "../../hooks/shared/useWindowSize";
import Profile from "../user/Profile";
import Conversations from "../conversations/Conversations";

function Sidebar() {
  const { user } = useAuth();
  const { windowSize } = useWindowSize();

  return (
    <Container>
      {windowSize.width > 768 && <Profile user={user} />}
      <Conversations />
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background: ${(props) => props.theme.bg_primary};
  z-index: 2;
  padding: 1rem 0 0 0;
  border-radius: 0 1rem 1rem 0;
  border-right: 1px solid ${(props) => props.theme.bg_sidebar};
  width: 15rem;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  height: calc(100vh - 1rem); // 100vh - padding

  @media all and (min-width: 768px) {
    border-radius: 0;
    border: none;
    width: 17.5rem;
  }
`;
