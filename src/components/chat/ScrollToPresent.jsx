import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function ScrollToPresent({ scrollToPresent }) {
  return (
    <Button type="button" onClick={scrollToPresent}>
      <span>You are currently viewing older messages.</span>
      <span>Teleport back to present.</span>
    </Button>
  );
}

export default ScrollToPresent;

ScrollToPresent.propTypes = {
  scrollToPresent: PropTypes.func.isRequired,
};

const Button = styled.button`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 0.1rem 1rem;
  width: 100%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.text_accent};
  border-radius: 2px 2px 0 0;
  font-weight: 400;

  & > span:first-child {
    display: none;
  }

  @media all and (min-width: 600px) {
    justify-content: space-between;

    & > span:first-child {
      display: inline;
    }
  }
`;
