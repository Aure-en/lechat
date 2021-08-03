import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useSection from "../../hooks/server/server/useSection";
import Category from "./Category";

function List({ serverId }) {
  const { sections: categories } = useSection(
    `${process.env.REACT_APP_SERVER}/servers/${serverId}/categories`,
    "category"
  );

  return (
    <Nav>
      <ul>
        {categories.map((category) => (
          <Category
            key={category._id}
            serverId={serverId}
            category={category}
          />
        ))}
      </ul>
    </Nav>
  );
}
export default List;

List.propTypes = {
  serverId: PropTypes.string.isRequired,
};

const Nav = styled.nav`
  overflow-y: auto;
`;
