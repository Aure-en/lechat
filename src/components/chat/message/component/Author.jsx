import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import useCard from "../../../../hooks/user/useCard";
import Card from "../../../user/Card";

function Author({ user }) {
  // Used to close the card on click outside.
  const ref = useRef();
  const { isOpen, setIsOpen } = useCard(ref);

  return (
    <>
      <Button type="button" ref={ref} onClick={() => setIsOpen(!isOpen)}>
        {user.username}
      </Button>
      <Transition in={isOpen} timeout={0}>
        {(state) => (
          <>
            {isOpen && (
              <Card
                user={user}
                position="right"
                parentPosition={ref.current.getBoundingClientRect()}
                $state={state}
              />
            )}
          </>
        )}
      </Transition>
    </>
  );
}

export default Author;

Author.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

const Button = styled.button`
  font-size: 1rem;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;
