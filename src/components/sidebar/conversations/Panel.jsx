import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import List from "./List";
import Empty from "./Empty";

const Panel = forwardRef(({ toggleDropdown, conversations }, ref) => {
  return (
    <>
      {conversations.length > 0 ? (
        <Ul ref={ref}>
          <List conversations={conversations} />
        </Ul>
      ) : (
        <Empty close={toggleDropdown} ref={ref} />
      )}
    </>
  );
});

Panel.propTypes = {
  toggleDropdown: PropTypes.func.isRequired,
  conversations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Panel;

const Ul = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-radius: 0 1rem 1rem 0;
  top: 1rem;
  bottom: 0;
  left: calc(100% - 1rem);
  background: ${(props) => props.theme.bg_secondary};
  min-width: 5rem;
  padding: 0.75rem 0;
  padding-left: 1rem; // Compensate the extra 1rem overlapping with navbar.
  height: calc(100% - 2rem);

  & li {
    position: relative;
    margin-bottom: 0.5rem;
  }

  & li:hover:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: -0.5rem;
    border: 7px solid transparent;
    border-left: 7px solid ${(props) => props.theme.bg_sidebar};
    transform: translateY(-50%);
    opacity: 0.5;
  }

  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 0.5rem 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebar};
  }
`;
