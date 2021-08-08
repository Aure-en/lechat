import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Pins from "./Pins";
import OpenRight from "../shared/sidebar/OpenRight";
import IconChevron from "../../assets/icons/general/IconChevron";

function Header({ name, description, location }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Content>
        <Left>
          {description && (
            <Button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              $isOpen={isOpen}
            >
              <IconChevron />
            </Button>
          )}
          <Heading>{name}</Heading>
        </Left>

        <Icons>
          <Pins location={location} />
          {location.server && <OpenRight />}
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
  location: PropTypes.shape({
    conversation: PropTypes.string,
    server: PropTypes.string,
    channel: PropTypes.string,
  }).isRequired,
};

Header.defaultProps = {
  description: undefined,
};

const Container = styled.header`
  padding: 1.15rem 1rem 1rem 4rem;

  @media all and (min-width: 768px) {
    padding: 2rem 2rem 1rem 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.text_tertiary};
`;

const Button = styled.button`
  margin-right: 0.5rem;
  position: relative;
  top: ${(props) => (props.$isOpen ? "2px" : "0")};
  color: ${(props) => props.theme.text_secondary};
  transform: ${(props) => !props.$isOpen && "rotate(-90deg)"};
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
