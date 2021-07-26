import React from "react";
import { useRight } from "../../../context/sidebars/RightContext";
import { ReactComponent as IconMembers } from "../../../assets/icons/server/members.svg";

function OpenRight() {
  const { isOpen, setIsOpen } = useRight();
  return (
    <button type="button" onClick={() => setIsOpen(!isOpen)}>
      <IconMembers />
    </button>
  );
}

export default OpenRight;
