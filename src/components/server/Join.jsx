import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Button from "../shared/buttons/Gradient";

function Join({ server }) {
  const history = useHistory();

  const join = async (e, id) => {
    e.preventDefault();
    // Join server
    await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/servers/${id}`,
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
  return (
    <Container>
      <Header>
        <Heading>Invitation to {server.name}</Heading>
      </Header>

      <Content>
        {server.icon ? (
          <Icon
            src={`data:${server.icon.contentType};base64,${Buffer.from(
              server.icon.data
            ).toString("base64")}`}
            alt={server.name}
          />
        ) : (
          <Default>{server.name[0]}</Default>
        )}

        <Name>{server.name}</Name>
        <Description>
          {server.about}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quos
          deserunt voluptatibus labore sit.
        </Description>
      </Content>

      <Form
        onSubmit={(e) => {
          join(e, server._id);
        }}
      >
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
    icon: PropTypes.shape({
      contentType: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }).isRequired,
};

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.bg_chat};
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

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackBtn = styled.button`
  color: ${(props) => props.theme.text_secondary};

  &:hover {
    color: ${(props) => props.theme.text_primary};
  }
`;
