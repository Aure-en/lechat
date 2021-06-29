import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createPortal } from "react-dom";

function Contextual({ outerRef, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    if (outerRef && outerRef.current.contains(e.target)) {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClick = () => setIsOpen(false);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <>
          {createPortal(
            <Container $position={position}>{children}</Container>,
            document.querySelector("#modal-root")
          )}
        </>
      )}
    </>
  );
}

export default Contextual;

Contextual.propTypes = {
  outerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

const Container = styled.div`
  position: absolute;
  top: ${(props) => `${props.$position.y}px`};
  left: ${(props) => `${props.$position.x}px`};
`;
