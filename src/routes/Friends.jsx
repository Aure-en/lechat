import React from "react";
import Add from "../components/friends/Add";
import All from "../components/friends/All";
import Pending from "../components/friends/Pending";

function Friends() {
  return (
    <div>
      Add a friend:
      <Add />
      All friends:
      <All />
      Pending requests:
      <Pending />
    </div>
  );
}

export default Friends;
