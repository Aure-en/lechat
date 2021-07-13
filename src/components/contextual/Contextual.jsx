import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createPortal } from "react-dom";

function Contextual({ outerRef, ignoreRef, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    // If we right-click on a children with a distinct contextual menu, return.
    if (ignoreRef && ignoreRef.current.contains(e.target)) {
      return setIsOpen(false);
    }

    // Open the menu at mouse's coordinates.
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
  // outerRef : element on which a right-click makes the contextual menu appears.
  outerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,

  // ignoreRef : children that are ignored by the right-click.
  ignoreRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Contextual.defaultProps = {
  ignoreRef: undefined,
};

const Container = styled.div`
  position: absolute;
  top: ${(props) => `${props.$position.y}px`};
  left: ${(props) => `${props.$position.x}px`};
  background: ${(props) => props.theme.bg_secondary};
  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;
  z-index: 20;
  background: ${(props) => props.theme.more_bg};
  border: 1px solid ${(props) => props.theme.border_button};
  border-radius: 3px;

  & > * {
    padding: 0.25rem 1rem;
    width: 100%;
    text-align: start;
    font-size: 0.875rem;
    white-space: nowrap;

    &:hover {
      background: ${(props) => props.theme.more_bg_hover};
    }
  }
`;
