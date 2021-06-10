import React from 'react'
import Add from "../components/friends/Add";
import List from "../components/friends/List";

function Friends() {
  return (
    <div>
      Add a friend:
      <Add />
      Friends:
      <List />
    </div>
  )
}

export default Friends
