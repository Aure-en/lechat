import React from "react";
import styled from "styled-components";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Container>
      {user.avatar ? (
        <Icon
          src={`data:${user.avatar.contentType};base64,${Buffer.from(
            user.avatar.data
          ).toString("base64")}`}
          alt={user.username}
        />
      ) : (
        <Default>{user.username[0]}</Default>
      )}
      <Heading>{user.username}</Heading>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Heading = styled.h2`
  font-family: "Assistant", sans-serif;
  font-size: 1.375rem;
  margin: 1rem 0;
  font-weight: 300;
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
