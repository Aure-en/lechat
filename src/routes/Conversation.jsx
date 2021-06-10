import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Conversation({ match }) {
  const [conversation, setConversation] = useState();

  useEffect(() => {
    (async () => {
      // Check conversation existence
      const existRes = await fetch(
        `${process.env.REACT_APP_URL}/conversations?members=${match.params.userId},${JSON.parse(localStorage.getItem("user"))._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const exist = await existRes.json();
      let conversation = exist;

      // If the conversation does not exist, create it.
      if (!exist) {
        const createRes = await fetch(
          `${process.env.REACT_APP_URL}/conversations`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              members: `["${match.params.userId}","${JSON.parse(localStorage.getItem("user"))._id}"]`,
            }),
          }
        );
        const create = await createRes.json();
        conversation = create;
      }

      // Set the conversation.
      setConversation(conversation);
      console.log(conversation);
    })();
  }, []);

  return <div>conversation blblblll</div>;
}

export default Conversation;
