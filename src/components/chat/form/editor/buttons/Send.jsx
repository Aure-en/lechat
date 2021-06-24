import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as IconSend } from "../../../../../assets/icons/editor/send.svg";

function Send({ onEnter }) {
  return (
    <Button type="button" onClick={onEnter}>
      Send
    </Button>
  );
}

export default Send;

Send.propTypes = {
  onEnter: PropTypes.func,
};

Send.defaultProps = {
  onEnter: () => {},
};

const Button = styled.button``;
