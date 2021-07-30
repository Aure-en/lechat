import React from "react";
import { useSidebar } from "../../../context/SidebarContext";
import { ReactComponent as IconMembers } from "../../../assets/icons/server/members.svg";

function OpenRight() {
  const { isOpen, setIsOpen } = useSidebar();
  return (
    <button type="button" onClick={() => setIsOpen(!isOpen)}>
      <IconMembers />
    </button>
  );
}

export default OpenRight;
