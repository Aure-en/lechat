import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import Preview from "./Preview";
import useCard from "../../../hooks/user/useCard";
import Card from "../../user/Card";

function Member({ member }) {
  // Used to close the card on click outside.
  const ref = useRef();
  const { isOpen, setIsOpen } = useCard(ref);

  return (
    <Li key={member._id} onClick={() => setIsOpen(!isOpen)} ref={ref}>
      <Preview member={member} />
      <Transition in={isOpen} timeout={0}>
        {(state) => (
          <>
            {isOpen && (
              <Card
                user={member}
                position="left"
                parentPosition={ref.current.getBoundingClientRect()}
                $state={state}
              />
            )}
          </>
        )}
      </Transition>
    </Li>
  );
}

export default Member;

Member.propTypes = {
  member: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
    avatar: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }).isRequired,
};

const Li = styled.li`
  position: relative;
  margin-bottom: 0.5rem;
`;
