import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconChevron from "../../../assets/icons/general/IconChevron";
import useMembers from "../../../hooks/server/server/useMembers";
import Member from "./Member";

function Members({ serverId }) {
  const [isOpen, setIsOpen] = useState(true);
  const { members } = useMembers(serverId);

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
          {members?.map((member) => (
            <Member key={member._id} member={member} />
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

const Icon = styled.span`
  position: relative;
  top: ${(props) => (props.$isOpen ? "0" : "2px")};
  transition: all 0.3s linear;
  transform: ${(props) => !props.$isOpen && "rotate(90deg)"};
`;
