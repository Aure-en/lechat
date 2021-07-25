import React from "react";
import styled from "styled-components";

function New() {
  return <Indicator />;
}

export default New;

const Indicator = styled.div`
  display: flex;
  color: ${(props) => props.theme.bg_secondary};
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 400;

  &:after {
    content: "TEST";
    padding-right: 4px;
    line-height: 0;
    border: 0.5rem solid ${(props) => props.theme.send_bg};
    border-right: 0.5rem solid transparent;
  }

  &:before {
    position: relative;
    top: calc((0.75rem / 2) + 1px);
    content: "";
    line-height: 0;
    height: 1px;
    background: ${(props) => props.theme.send_bg};
    flex: 1;
  }
`;
