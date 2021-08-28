import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../../components/server/Form";
import Delete from "../../components/server/Delete";
import useServer from "../../hooks/server/server/useServer";

function Settings({ match }) {
  const { server } = useServer(match.params.serverId);

  return (
    <Wrapper>
      <Container>{server && <Form server={server} />}</Container>
      {/* &#8592; = ← */}
      <Bottom>
        <StyledLink to={`/servers/${match.params.serverId}`}>
          &#8592; Back to Server
        </StyledLink>
        {server && <Delete server={server} />}
      </Bottom>
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
  display: grid;
  grid-template-rows: 1fr auto;
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

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  font-size: 0.925rem;
  color: ${(props) => props.theme.text_secondary};

  &:hover {
    color: ${(props) => props.theme.text_quaternary};
  }
`;
