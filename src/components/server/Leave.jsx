import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function Leave({ serverId }) {
  const history = useHistory();

  const leave = async (serverId) => {
    // Leave server
    await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/servers/${serverId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Redirect to homepage
    history.push("/");
  };

  return (
    <button type="button" onClick={() => leave(serverId)}>
      Leave Server
    </button>
  );
}

export default Leave;

Leave.propTypes = {
  serverId: PropTypes.string.isRequired,
};

