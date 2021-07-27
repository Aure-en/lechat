import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../context/AuthContext";
import Conversation from "./Conversation";

function List({ conversations }) {
  const { user } = useAuth();

  if (conversations.length < 1) return <></>;

  return (
    <>
      {conversations.map((conversation) => {
        const friend = conversation.members.find(
          (member) => member._id !== user._id
        );
        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            friend={friend}
          />
        );
      })}
    </>
  );
}

export default List;

List.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      members: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
        })
      ),
    })
  ),
};

List.defaultProps = {
  conversations: [],
};
