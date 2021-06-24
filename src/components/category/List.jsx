import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useSection from "../../hooks/realtime/useSection";
import Channels from "../channel/List";
import ChannelModal from "../modals/server/Channel";
import CategoryModal from "../modals/server/Category";

import IconChevron from "../../assets/icons/general/IconChevron";

function List({ serverId }) {
  const { sections: categories } = useSection(
    `${process.env.REACT_APP_URL}/servers/${serverId}/categories`,
    "category"
  );

  return (
    <Nav>
      <ul>
        {categories.map((category) => (
          <Li key={category._id} serverId={serverId} category={category} />
        ))}
      </ul>
    </Nav>
  );
}

function Li({ serverId, category }) {
  const [isOpen, setIsOpen] = useState(true);

  const remove = (id) => {
    fetch(`${process.env.REACT_APP_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  };

  return (
    <li>
      <Category>
        <Name type="button" onClick={() => setIsOpen(!isOpen)} >
          <Icon $open={isOpen}>
            <IconChevron />
          </Icon>
          {category.name}
        </Name>
        <ChannelModal serverId={serverId} categoryId={category._id} />
      </Category>
      {isOpen && <Channels serverId={serverId} categoryId={category._id} />}
      {/* <CategoryModal serverId={serverId} category={category} />
    <button type="button" onClick={() => remove(category._id)}>
      Delete
    </button> */}
    </li>
  );
}

export default List;

List.propTypes = {
  serverId: PropTypes.string.isRequired,
};

const Nav = styled.nav`
  overflow-y: auto;
`;

const Category = styled.div`
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
`;

const Icon = styled.span`
  line-height: 0;
  transform: ${(props) => !props.$open && "rotate(-90deg)"};
  transition: transform 0.3s linear;
`;
