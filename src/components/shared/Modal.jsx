import React, { useRef } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { ReactComponent as IconClose } from "../../assets/icons/general/close.svg";

function Modal({ isOpen, setIsOpen, children }) {
  const ref = useRef();
  return (
    <>
      {isOpen && (
        <>
          {createPortal(
            <Wrapper
              onMouseDown={(e) => {
                if (ref && !ref.current.contains(e.target)) setIsOpen(false);
              }}
            >
              <Container ref={ref}>
                <Content>
                  <CloseBtn type="button" onClick={() => setIsOpen(false)}>
                    <IconClose />
                  </CloseBtn>
                  {children}
                  <BackBtn type="button" onClick={() => setIsOpen(false)}>
                    ← Back
                  </BackBtn>
                </Content>
              </Container>
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
  z-index: 99;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  // Borders are a bit blurry on Chrome when using this.
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.modal_bg};
  border: 1px solid ${(props) => props.theme.border};
  z-index: 100;
`;

const Content = styled.div`
  padding: 3rem;
`;

const Button = styled.button`
  position: absolute;
  color: ${(props) => props.theme.text_secondary};

  &:hover {
    color: ${(props) => props.theme.text_primary};
  }
`;

const CloseBtn = styled(Button)`
  top: 1.5rem;
  right: 1.5rem;

  &:hover {
    color: ${(props) => props.theme.text_tertiary};
  }
`;

const BackBtn = styled(Button)`
  bottom: 3.65rem;
  left: 3rem;

  &:hover {
    color: ${(props) => props.theme.text_tertiary};
    text-decoration: underline;
  }
`;
