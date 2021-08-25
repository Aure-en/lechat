import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconChevron from "../../assets/icons/general/IconChevron";
import { usePermission } from "../../context/PermissionContext";
import useMembers from "../../hooks/server/server/useMembers";
import { ReactComponent as IconCrown } from "../../assets/icons/server/crown.svg";

function Members({ serverId }) {
  const [isOpen, setIsOpen] = useState(true);
  const { members } = useMembers(serverId);
  const { server } = usePermission();

  return (
    <Container>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <Heading>Members</Heading>
        <Icon $isOpen={isOpen}>
          <IconChevron />
        </Icon>
      </Button>
      {isOpen && (
        <ul>
          {/* Display user's avatar, name, and indicator if the user is the admin. */}
          {members.map((member) => (
            <Li key={member._id}>
              {member.avatar ? (
                <Avatar
                  src={`data:${member.avatar.type};base64,${Buffer.from(
                    member.avatar.thumbnail || member.avatar.data
                  ).toString("base64")}`}
                  alt={member.username}
                />
              ) : (
                <Default>{member.username[0]}</Default>
              )}
              {member.username}
              {server.includes(member._id) && (
                <Crown aria-label="Server Owner">
                  <IconCrown />
                </Crown>
              )}
            </Li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default Members;

Members.propTypes = {
  serverId: PropTypes.string.isRequired,
};

const Container = styled.div`
  overflow-y: auto;
  width: 15rem;
  padding: 1rem 0.8rem 1rem 1rem;
  margin-right: 0.2rem; // Space between scroll bar and window

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 3.5rem 0 0.25rem 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }

  @media all and (min-width: 992px) {
    width: 17.5rem;
    padding: 2rem 2rem 2rem 1rem;
  }
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: ${(props) => props.theme.text_secondary};
`;

const Heading = styled.h3`
  text-transform: uppercase;
  color: ${(props) => props.theme.text_tertiary};
  margin-bottom: 0.5rem;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Icon = styled.span`
  position: relative;
  top: ${(props) => (props.$isOpen ? "0" : "2px")};
  transition: all 0.3s linear;
  transform: ${(props) => !props.$isOpen && "rotate(90deg)"};
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

const Crown = styled.span`
  display: flex;
  align-items: flex-end;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.send_bg};
`;