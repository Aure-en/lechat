import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../../hooks/shared/useFetch";
import IconChevron from "../../assets/icons/server/IconChevron";

function Members({ serverId }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: members } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${serverId}/members`
  );

  return (
    <Container>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <Heading>Members</Heading>
        <IconChevron />
      </Button>
      <ul>
        {members &&
          members.map((member) => (
            <Li key={member._id}>
              {member.avatar ? (
                <Icon
                  src={`data:${member.avatar.contentType};base64,${Buffer.from(
                    member.avatar.data
                  ).toString("base64")}`}
                  alt={member.username}
                />
              ) : (
                <Default>{member.username[0]}</Default>
              )}
              {member.username}
            </Li>
          ))}
      </ul>
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

const Icon = styled.img`
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
