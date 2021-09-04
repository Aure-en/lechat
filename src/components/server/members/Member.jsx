import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Preview from "./Preview";
import Card from "../../user/Card";

function Member({ member }) {
  // Open / closes the member's information card.
  const [isOpen, setIsOpen] = useState(false);

  // When the card is open, clicking outside the ref will close it.
  const ref = useRef();

  const handleClick = (e) => {
    if (!ref?.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener("click", handleClick);
    } else {
      document.body.removeEventListener("click", handleClick);
    }
    return () => document.body.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <Li key={member._id} onClick={() => setIsOpen(!isOpen)} ref={ref}>
      <Preview member={member} />
      {isOpen && (
        <Card
          user={member}
          position="left"
          parentPosition={ref.current.getBoundingClientRect()}
        />
      )}
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
