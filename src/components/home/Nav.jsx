import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();

  return (
    <Container>
      <NavLink
        to="/user/friends"
        $active={location.pathname === "/user/friends"}
      >
        Friends
      </NavLink>
      <NavLink
        to="/user/servers"
        $active={location.pathname === "/user/servers"}
      >
        Servers
      </NavLink>
    </Container>
  );
}

export default Nav;

const Container = styled.nav`
  align-self: center;
`;

const NavLink = styled(Link)`
  display: inline-block;
  margin: 0 1rem;
  padding: 0.5rem 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 1rem; // Padding-bottom
    right: 0;
    width: ${(props) => (props.$active ? "100%" : "0")};
    height: 1px;
    background: linear-gradient(
      to right,
      ${(props) =>
        `${props.theme.bg_sidebars} 0%, ${props.theme.border_accent} 100%`}
    );
    transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }

  @media all and (min-width: 576px) {
    padding: 1rem 0;
  }
`;
