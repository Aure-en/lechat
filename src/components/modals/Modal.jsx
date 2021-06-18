import React, { useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";

function Modal({ isOpen, setIsOpen, children }) {
  const ref = useRef();
  return (
    <>
      {isOpen && (
        <>
          {ReactDOM.createPortal(
            <Wrapper
              onClick={(e) => {
                if (e.target.contains(ref.current)) setIsOpen(false);
              }}
            >
              <Container ref={ref}>{children}</Container>
            </Wrapper>,
            document.body.querySelector("#modal-root")
          )}
        </>
      )}
    </>
  );
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.modal_overlay};
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(
    -50.1%,
    -50.1%
  ); // translate(50%, 50%) makes border blurry due to Chrome bug (?)
  background: ${(props) => props.theme.modal_bg};
`;
