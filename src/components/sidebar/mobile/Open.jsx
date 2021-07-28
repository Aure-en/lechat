import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as IconMenu } from "../../../assets/icons/nav/menu.svg";

function Open({ open }) {
  return (
    <Button type="button" onClick={open}>
      <IconMenu />
    </Button>
  );
}

export default Open;

Open.propTypes = {
  open: PropTypes.func.isRequired,
};

const Button = styled.button`
  position: absolute;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.bg_sidebar};
  top: 0.5rem;
  left: 0.5rem;
  border-radius: 50%;
  z-index: 4;
`;
