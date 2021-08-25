import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useJoin from "../../hooks/server/server/useJoin";
import Button from "../shared/buttons/Gradient";

function Join({ server }) {
  const history = useHistory();
  const { handleSubmit } = useJoin(server._id);

  return (
    <Container>
      <Header>
        <Heading>Invitation to {server.name}</Heading>
      </Header>

      <Content>
        {server.icon ? (
          <Icon
            src={`data:${server.icon.type};base64,${Buffer.from(
              server.icon.data
            ).toString("base64")}`}
            alt={server.name}
          />
        ) : (
          <Default>{server.name[0]}</Default>
        )}

        <Name>{server.name}</Name>
        <Description>{server.about}</Description>
      </Content>

      <Form onSubmit={handleSubmit}>
        <BackBtn type="button" onClick={() => history.push("/")}>
          ← Back
        </BackBtn>
        <Button>Join Server</Button>
      </Form>
    </Container>
  );
}

export default Join;

Join.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    about: PropTypes.string,
    icon: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }).isRequired,
};

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.bg_secondary};
  width: 100vw;
  max-width: 30rem;
  padding: 3rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin: 0;
`;

const Name = styled.h3`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  text-transform: uppercase;
  margin: 1rem 0;
  font-weight: 300;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Description = styled.p`
  color: ${(props) => props.theme.text_secondary};
  font-size: 0.875rem;
  width: 80%;
  text-align: center;
`;

const Icon = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;

const BackBtn = styled.button`
  color: ${(props) => props.theme.text_secondary};

  &:hover {
    color: ${(props) => props.theme.text_primary};
  }
`;
