import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../../components/server/Form";
import useUpdate from "../../hooks/realtime/server/useServer";

function Settings({ match }) {
  const { server } = useUpdate(match.params.serverId);

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
  background: ${(props) => props.theme.bg_chat};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  padding: 2rem 3rem;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
`;
