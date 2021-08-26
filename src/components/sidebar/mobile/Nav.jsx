import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Home from "../links/Home";
import Friends from "../links/Friends";
import Settings from "../links/Settings";
import { ReactComponent as IconGrid } from "../../../assets/icons/nav/grid.svg";
import IconClose from "../../../assets/icons/general/IconClose";

function Nav({ close, setIsContentOpen }) {
  const setServerLink = () => {
    const server = localStorage.getItem("server");
    const channel =
      server && localStorage.getItem(localStorage.getItem("server"));

    if (server) {
      return channel
        ? `/servers/${server}/channels/${channel}`
        : `/servers/${server}`;
    }
    return `/users/servers`;
  };

  return (
    <Container>
      <button type="button" onClick={() => setIsContentOpen(false)}>
        <Home />
      </button>

      <button type="button" onClick={() => setIsContentOpen(true)}>
        <Link to={setServerLink()}>
          <IconGrid />
        </Link>
      </button>

      <button type="button" onClick={() => setIsContentOpen(false)}>
        <Friends />
      </button>

      <Settings />

      <button type="button" onClick={() => close(false)}>
        <IconClose size="36" strokeWidth={1.5} />
      </button>
    </Container>
  );
}

export default Nav;

Nav.propTypes = {
  close: PropTypes.func.isRequired,
  setIsContentOpen: PropTypes.func,
};

Nav.defaultProps = {
  setIsContentOpen: () => {},
};

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  padding: 0.75rem;
  background: ${(props) => props.theme.bg_sidebar};
  border-radius: 1rem;
  color: ${(props) => props.theme.sidebar_button};
  z-index: 3;
`;
