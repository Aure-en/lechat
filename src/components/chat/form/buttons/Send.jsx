import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as IconSend } from "../../../../assets/icons/editor/send.svg";

function Send({ onEnter, disabled }) {
  return (
    <Button type="button" onClick={onEnter} disabled={disabled}>
      Send
    </Button>
  );
}

export default Send;

Send.propTypes = {
  onEnter: PropTypes.func,
  disabled: PropTypes.bool,
};

Send.defaultProps = {
  onEnter: () => {},
  disabled: false,
};

const Button = styled.button`
  padding: 0 1rem;
  border-radius: 3px;
  font-weight: 500;
  background: ${(props) =>
    props.disabled ? props.theme.send_bg_disabled : props.theme.send_bg};
  color: ${(props) => props.theme.send_text};

  &:hover {
    background: ${(props) => !props.disabled && props.theme.send_bg_hover};
  }
`;
