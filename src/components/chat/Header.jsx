import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import OpenRight from "../shared/sidebar/OpenRight";
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
      <Content>
        <Heading>{name}</Heading>
        <Icons>
          <OpenRight />
          <Button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            $isOpen={isOpen}
          >
            <IconChevron />
          </Button>
        </Icons>
      </Content>
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
  padding: 2rem 2rem 1rem 2rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.text_tertiary};
`;

const Button = styled.button`
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
