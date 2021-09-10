import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

function DisabledAvatar() {
  const { user } = useAuth();

  return (
    <Field>
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
      <small>(The avatar cannot be modified on the sample account)</small>
    </Field>
  );
}

export default DisabledAvatar;

const Field = styled.div`
  display: flex;
  align-items: center;

  & > small {
    margin-left: 2rem;
    color: ${(props) => props.theme.text_quaternary};
  }
`;

const avatar = `
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const Icon = styled.img`
  ${avatar};
  object-fit: cover;
`;

const Default = styled.div`
  ${avatar};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;
