import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Spoiler({ children }) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <Container onClick={() => setIsHidden(!isHidden)} $isHidden={isHidden}>
      {children}
    </Container>
  );
}

export default Spoiler;

const Container = styled.span`
  background: ${(props) =>
    props.$isHidden ? props.theme.bg_button : props.theme.bg_primary};
  color: ${(props) => props.$isHidden && props.theme.bg_button};
  border-radius: 3px;
`;

Spoiler.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
