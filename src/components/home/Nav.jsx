import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import NavLink from "../shared/links/Underline";

function Nav() {
  const location = useLocation();

  return (
    <Container>
      <NavLink to="/" active={location.pathname === "/"}>
        Friends
      </NavLink>
      <NavLink
        to="/user/servers"
        active={location.pathname === "/user/servers"}
      >
        Servers
      </NavLink>
    </Container>
  );
}

export default Nav;

const Container = styled.nav`
  align-self: center;
  margin-bottom: 1rem;
`;
