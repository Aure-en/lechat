import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Join({ match }) {
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${match.params.serverId}`
  );
  const history = useHistory();

  const join = async () => {
    // Join server
    await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/servers/${server._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Redirect to server page
    history.push(`/servers/${server._id}`);
  };

  useEffect(() => {
    // If the user is already in this server, redirects him to the server page.
    if (!server) return;
    if (JSON.parse(localStorage.getItem("user")).server.includes(server._id)) {
      history.push(`/servers/${server._id}`);
    }
  }, [server]);

  if (
    server &&
    !JSON.parse(localStorage.getItem("user")).server.includes(server._id)
  ) {
    return (
      <>
        <div>Would you like the join the server {server.name} ?</div>
        <button type="button" onClick={join}>
          Join
        </button>
      </>
    );
  }

  return <></>;
}

export default Join;

Join.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string,
    }),
  }).isRequired,
};
