import React from "react";
import Server from "./Server";
import Conversation from "./Conversation";

function Sidebar() {
  return (
    <nav>
      <Server />
      <Conversation />
    </nav>
  );
}

export default Sidebar;
