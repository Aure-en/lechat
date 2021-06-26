import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../../hooks/shared/useFetch";
import IconChevron from "../../assets/icons/general/IconChevron";

function Members({ serverId }) {
  const [isOpen, setIsOpen] = useState(true);
  const { data: members } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${serverId}/members`
  );

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
          {members &&
            members.map((member) => (
              <Li key={member._id}>
                {member.avatar ? (
                  <Avatar
                    src={`data:${
                      member.avatar.contentType
                    };base64,${Buffer.from(member.avatar.data).toString(
                      "base64"
                    )}`}
                    alt={member.username}
                  />
                ) : (
                  <Default>{member.username[0]}</Default>
                )}
                {member.username}
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

const Container = styled.div``;

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
