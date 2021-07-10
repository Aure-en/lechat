import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

function Empty({ close }) {
  return (
    <Bubble>
      You have no new messages. <br />
      <Link to="/" onClick={() => close(false)}>
        How about talking to a friend ?
      </Link>
    </Bubble>
  );
}

export default Empty;

Empty.propTypes = {
  close: PropTypes.func,
};

Empty.defaultProps = {
  close: () => {},
};

const Bubble = styled.div`
  position: absolute;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  border-radius: 1rem;
  top: -50%;
  left: calc(100% + 2rem);
  background: ${(props) => props.theme.bg_secondary};
  color: ${(props) => props.theme.text_primary};
  padding: 1rem;
  min-width: 10rem;
  text-align: center;
  font-size: 0.875rem;

  // 2 triangles overlapping
  // (Main color + border)
  &:after {
    content: "";
    position: absolute;
    border-radius: 1rem;
    width: 0.4rem;
    height: 2rem;
    top: 15%;
    left: -0.7rem;
    background: ${(props) => props.theme.bg_secondary};
    border: 1px solid ${(props) => props.theme.bg_sidebar};
  }

  &:before {
    content: "";
    position: absolute;
    border-radius: 1rem;
    width: 0.4rem;
    height: 1rem;
    top: 20%;
    left: -1.25rem;
    background: ${(props) => props.theme.bg_secondary};
    border: 1px solid ${(props) => props.theme.bg_sidebar};
  }

  & > a {
    color: ${(props) => props.theme.text_tertiary};

    &:hover {
      text-decoration: underline;
    }
  }
`;
