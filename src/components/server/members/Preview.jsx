import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { usePermission } from "../../../context/PermissionContext";
import { ReactComponent as IconCrown } from "../../../assets/icons/server/crown.svg";

function Preview({ member }) {
  const { server } = usePermission();

  return (
    <Container>
      {/* Avatar */}
      {member.avatar ? (
        <Avatar
          src={`data:${member.avatar.type};base64,${Buffer.from(
            member.avatar.data
          ).toString("base64")}`}
          alt={member.username}
        />
      ) : (
        <Default>{member.username[0]}</Default>
      )}

      {/* Username */}
      <Username>{member.username}</Username>

      {/* Admin indicator */}
      {server.includes(member._id) && (
        <Crown aria-label="Server Owner">
          <IconCrown />
        </Crown>
      )}
    </Container>
  );
}

export default Preview;

Preview.propTypes = {
  member: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
    avatar: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }).isRequired,
};

const Container = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
`;

const Avatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  margin-right: 0.5rem;
`;

const Username = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;

const Crown = styled.span`
  display: flex;
  align-items: flex-end;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.send_bg};
`;
