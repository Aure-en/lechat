import React from "react";
import styled from "styled-components";
import Add from "../components/friends/Add";
import All from "../components/friends/All";
import Pending from "../components/friends/Pending";

function Friends() {
  return (
    <div>
      All friends:
      <All />
      Pending requests:
      <Pending />

      <Add />
    </div>
  );
}

export default Friends;
