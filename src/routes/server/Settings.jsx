import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../../components/server/Form";
import useServer from "../../hooks/server/server/useServer";

function Settings({ match }) {
  const { server } = useServer(match.params.serverId);

  return (
    <Wrapper>
      <Container>{server && <Form server={server} />}</Container>
    </Wrapper>
  );
}

export default Settings;

Settings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string,
    }),
  }).isRequired,
};

const Wrapper = styled.main`
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 1rem;
  padding: 3rem 1rem 1.25rem 1rem;

  @media all and (min-width: 576px) {
    padding: 3rem;
    margin: 1rem;
  }
`;

const Container = styled.div`
  width: 100%;
`;
