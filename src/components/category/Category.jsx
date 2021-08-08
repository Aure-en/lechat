import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { usePermission } from "../../context/PermissionContext";
import { useAuth } from "../../context/AuthContext";
import Modal from "../channel/Modal";
import Menu from "./Menu";
import Channels from "../channel/List";

import IconChevron from "../../assets/icons/general/IconChevron";
import IconPlus from "../../assets/icons/general/IconPlus";

function Category({ serverId, category }) {
  const [areChannelsOpen, setAreChannelsOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // For contextual menu
  const outerRef = useRef();
  const ignoreRef = useRef();

  // Used to check if the user has the permission
  // to see the create button
  const { sections } = usePermission();
  const { user } = useAuth();

  return (
    <li ref={outerRef}>
      <Container>
        <Name
          type="button"
          onClick={() => setAreChannelsOpen(!areChannelsOpen)}
        >
          <Icon $open={areChannelsOpen}>
            <IconChevron />
          </Icon>
          {category.name}
        </Name>

        {sections.includes(user._id) && (
          <button type="button" onClick={() => setIsFormOpen(true)}>
            <IconPlus />
          </button>
        )}
      </Container>

      {areChannelsOpen && (
        <div ref={ignoreRef}>
          <Channels serverId={serverId} categoryId={category._id} />
        </div>
      )}

      {sections.includes(user._id) && (
        <Modal
          isOpen={isFormOpen}
          setIsOpen={setIsFormOpen}
          serverId={serverId}
          categoryId={category._id}
        />
      )}

      <Menu
        serverId={serverId}
        outerRef={outerRef}
        ignoreRef={ignoreRef}
        category={category}
      />
    </li>
  );
}

export default Category;

Category.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  serverId: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
`;

const Name = styled.button`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.text_tertiary};
  overflow: auto;

  &:hover {
    color: ${(props) => props.theme.text_tertiary_hover};
  }
`;

const Icon = styled.span`
  line-height: 0;
  color: ${(props) => props.theme.text_secondary};
  transform: ${(props) => !props.$open && "rotate(-90deg)"};
  transition: transform 0.3s linear;
`;
