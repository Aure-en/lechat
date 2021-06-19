import React from "react";
import PropTypes from "prop-types";
import Form from "../../components/server/Form";
import useFetch from "../../hooks/useFetch";

function Settings({ match }) {
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${match.params.serverId}`
  );

  return <>{server && <Form server={server} />}</>;
}

export default Settings;

Settings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string,
    }),
  }).isRequired,
};
