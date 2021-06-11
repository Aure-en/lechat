import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

function Conversation() {
  const { data: conversations, error } = useFetch(
    `${process.env.REACT_APP_URL}/users/${
      JSON.parse(localStorage.getItem("user"))._id
    }/conversations`
  );

  return (
    <ul>
      {conversations &&
        conversations.map((conversation) => (
          <li>
            {
              conversation.members.find(
                (user) =>
                  user._id !== JSON.parse(localStorage.getItem("user"))._id
              ).username
            }
          </li>
        ))}
    </ul>
  );
}

export default Conversation;
