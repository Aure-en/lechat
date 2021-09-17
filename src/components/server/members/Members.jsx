import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useMembers from "../../../hooks/server/server/useMembers";
import Member from "./Member";

function Members({ serverId }) {
  const { members } = useMembers(serverId);

  return (
    <Container>
      <Heading>Members</Heading>
      <ul>
        {/* Display user's avatar, name, and indicator if the user is the admin. */}
        {members?.map((member) => (
          <Member key={member._id} member={member} />
        ))}
      </ul>
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

const Heading = styled.h3`
  text-transform: uppercase;
  color: ${(props) => props.theme.text_tertiary};
  margin-bottom: 0.5rem;
  font-size: 0.925rem;
`;
