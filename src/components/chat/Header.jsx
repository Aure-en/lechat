import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconChevron from "../../assets/icons/general/IconChevron";

function Header({ name, description }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!description) {
    return (
      <Container>
        <Heading>{name}</Heading>
      </Container>
    );
  }

  return (
    <Container>
      <Button type="button" onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <IconChevron />
      </Button>
      <Heading>{name}</Heading>
      {isOpen && <Description>{description}</Description>}
    </Container>
  );
}

export default Header;

Header.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Header.defaultProps = {
  description: undefined,
};

const Container = styled.header`
  position: relative;
  padding: 2rem 2rem 1rem 2rem;
`;

const Button = styled.button`
  position: absolute;
  right: 2rem; // Padding
  color: ${(props) => props.theme.text_secondary};
  transform: ${(props) => !props.$isOpen && "rotate(90deg)"};
  transition: transform 0.3s linear;
`;

const Heading = styled.h1`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
`;

const Description = styled.p`
  color: ${(props) => props.theme.text_secondary};
  font-size: 0.875rem;
  margin-top: 1rem;
`;
