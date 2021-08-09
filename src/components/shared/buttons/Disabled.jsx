import React from "react";
import styled from "styled-components";

function Disabled() {
  return (
    <Button
      type="button"
      data-tip="Sorry, this option<br />is not available<br />on the Sample Account."
      data-for="settings"
    >
      Edit
    </Button>
  );
}

export default Disabled;

const Button = styled.button`
  padding: 0.35rem 0.75rem;
  border: 1px solid ${(props) => props.theme.text_secondary};
  color: ${(props) => props.theme.text_secondary};
  text-transform: uppercase;
  text-align: center;
  align-self: center;
  cursor: disabled;
  opacity: 0.5;
`;
