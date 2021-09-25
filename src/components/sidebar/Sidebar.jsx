import React, { useRef } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import usePanel from "../../hooks/sidebar/usePanel";
import useConversations from "../../hooks/sidebar/useConversations";
import Home from "./links/Home";
import Friends from "./links/Friends";
import Settings from "./links/Settings";
import LogOut from "./links/LogOut";
import ConversationButton from "./conversations/Button";
import ConversationPanel from "./conversations/Panel";
import ServerButton from "./servers/Button";
import ServerPanel from "./servers/Panel";

function Sidebar() {
  // Setup conversation panel
  const conversationsButtonRef = useRef();
  const conversationsPanelRef = useRef();
  const {
    isPanelOpen: isConversationPanelOpen,
    setIsPanelOpen: setIsConversationPanelOpen,
  } = usePanel(conversationsButtonRef, conversationsPanelRef);
  const { number, conversations } = useConversations();

  const toggleConversationPanel = () => {
    setIsConversationPanelOpen(!isConversationPanelOpen);
  };

  // Setup server panel
  const serversButtonRef = useRef();
  const serversPanelRef = useRef();
  const {
    isPanelOpen: isServerPanelOpen,
    setIsPanelOpen: setIsServerPanelOpen,
  } = usePanel(serversButtonRef, serversPanelRef);

  const toggleServerPanel = () => {
    setIsServerPanelOpen(!isServerPanelOpen);
  };

  return (
    <Container>
      <Left>
        <Content>
          <Home />
          <ServerButton
            togglePanel={toggleServerPanel}
            ref={serversButtonRef}
          />
          <ConversationButton
            number={number}
            togglePanel={toggleConversationPanel}
            ref={conversationsButtonRef}
          />
          <Friends />
          <Settings />
        </Content>
        <Content>
          <LogOut />
        </Content>
        <ReactTooltip id="nav" effect="solid" place="right" />
      </Left>

      {isConversationPanelOpen && (
        <ConversationPanel
          ref={conversationsPanelRef}
          toggleDropdown={setIsConversationPanelOpen}
          conversations={conversations}
        />
      )}
      {isServerPanelOpen && <ServerPanel ref={serversPanelRef} />}
    </Container>
  );
}

export default Sidebar;

const Container = styled.nav`
  position: relative;
  z-index: 5;
`;

const Left = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 4rem;
  padding: 1rem 0.75rem;
  background: ${(props) => props.theme.bg_sidebar};
  margin: 1rem;
  margin-right: 0;
  border-radius: 1rem;
  color: ${(props) => props.theme.sidebar_button};
  z-index: 5;
  height: calc(100% - 2rem); // 100% - padding
`;

const Content = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;

  & > li,
  & > button,
  & > a {
    position: relative;
  }

  & > li:hover:before,
  & > button:hover:before,
  & > a:hover:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: calc(-1rem);
    border: 8px solid transparent;
    border-left: 8px solid ${(props) => props.theme.sidebar_button};
    transform: translateY(-50%);
  }
`;
