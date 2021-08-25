import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Profile({ user }) {
  if (!user) return <></>;

  return (
    <Container>
      {user.avatar && Object.keys(user.avatar).length > 0 ? (
        <Icon
          src={`data:${user.avatar.type};base64,${Buffer.from(
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

Profile.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
    username: PropTypes.string,
  }).isRequired,
};

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
