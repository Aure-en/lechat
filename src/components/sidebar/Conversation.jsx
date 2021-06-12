import React from "react";
import { Link } from "react-router-dom";
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
            <Link
              to={`/conversations/${
                conversation.members.find(
                  (user) =>
                    user._id !== JSON.parse(localStorage.getItem("user"))._id
                )._id
              }`}
            >
              {
                conversation.members.find(
                  (user) =>
                    user._id !== JSON.parse(localStorage.getItem("user"))._id
                ).username
              }
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default Conversation;
