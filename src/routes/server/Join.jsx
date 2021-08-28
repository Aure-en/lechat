import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useFetch from "../../hooks/shared/useFetch";
import Form from "../../components/server/Join";

function Join({ match }) {
  const { data: server } = useFetch(
    `${process.env.REACT_APP_SERVER}/servers/${match.params.serverId}`
  );
  const history = useHistory();

  useEffect(() => {
    // If the user is already in this server, redirects him to the server page.
    if (
      server &&
      JSON.parse(sessionStorage.getItem("user")).server.includes(server._id)
    ) {
      history.push(`/servers/${server._id}`);
    }
  }, [server]);

  if (
    server &&
    !JSON.parse(sessionStorage.getItem("user")).server.includes(server._id)
  ) {
    return (
      <Container>
        <Form server={server} />
      </Container>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
