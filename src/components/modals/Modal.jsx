import React, { useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { ReactComponent as IconClose } from "../../assets/icons/general/close.svg";

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
              <Container ref={ref}>
                <CloseBtn type="button" onClick={() => setIsOpen(false)}>
                  <IconClose />
                </CloseBtn>
                {children}
                <BackBtn type="button" onClick={() => setIsOpen(false)}>
                  ← Back
                </BackBtn>
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
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  // Borders are a bit blurry on Chrome when using this.
  transform: translate(-50%, -50%);
  backface-visibility: hidden;
  background: ${(props) => props.theme.modal_bg};
  border: 1px solid ${(props) => props.theme.border_primary};
  max-width: 30rem;
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
`;

const BackBtn = styled(Button)`
  bottom: 3.65rem;
  left: 3rem;
`;
