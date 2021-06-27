import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../../components/server/Form";
import useFetch from "../../hooks/shared/useFetch";

function Settings({ match }) {
  const { data: server } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${match.params.serverId}`
  );

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
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 50rem;
`;
