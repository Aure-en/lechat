import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ChannelModal from "../modals/server/Channel";
import Menu from "./Menu";
import Channels from "../channel/List";

import IconChevron from "../../assets/icons/general/IconChevron";
import IconPlus from "../../assets/icons/general/IconPlus";

function Category({ serverId, category }) {
  const [areChannelsOpen, setAreChannelsOpen] = useState(true);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  // For contextual menu
  const outerRef = useRef();
  const ignoreRef = useRef();

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

        <button type="button" onClick={() => setIsUpdateOpen(true)}>
          <IconPlus />
        </button>
      </Container>

      {areChannelsOpen && (
        <div ref={ignoreRef}>
          <Channels serverId={serverId} categoryId={category._id} />
        </div>
      )}

      <ChannelModal
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        serverId={serverId}
        categoryId={category._id}
      />

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
  color: ${(props) => props.theme.text_secondary};
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
    margin: 0.5rem 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_primary};
  }
`;

const Icon = styled.span`
  line-height: 0;
  transform: ${(props) => !props.$open && "rotate(-90deg)"};
  transition: transform 0.3s linear;
`;
