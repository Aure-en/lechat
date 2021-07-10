import React from "react";
import NavLink from "./NavLink";
import { ReactComponent as IconFriends } from "../../../assets/icons/nav/users.svg";

function Friends() {
  return (
    <NavLink to="/" tip="Friends">
      <IconFriends />
    </NavLink>
  );
}

export default Friends;
