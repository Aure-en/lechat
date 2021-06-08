import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

function Conversation() {
  const { data: conversations, error } = useFetch(
    `${process.env.REACT_APP_URL}/${localStorage.getItem("user")._id}/conversations`
  );

  return (
    <ul>
      {conversations.map((conversation) => (
        <li>{conversation._id}</li>
      ))}
    </ul>
  );
}

export default Conversation;
