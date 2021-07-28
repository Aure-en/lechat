import React, { useState, useRef } from "react";
import styled from "styled-components";
import Left from "./Left";
import Right from "./Right";
import Nav from "./Nav";
import Open from "./Open";
import useDropdown from "../../../hooks/shared/useDropdown";

function Mobile() {
  const ref = useRef(); // For dropdown
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown(ref);
  const [isContentOpen, setIsContentOpen] = useState(true);

  const open = () => {
    setIsDropdownOpen(true);
    setIsContentOpen(true);
  };

  return (
    <>
      <Open open={open} />

      {isDropdownOpen && (
        <Container ref={ref}>
          {isContentOpen && (
            <Content>
              <Left />
              <Right />
            </Content>
          )}
          <Nav close={setIsDropdownOpen} setIsContentOpen={setIsContentOpen} />
        </Container>
      )}
    </>
  );
}

export default Mobile;

const Container = styled.div`
  position: relative;
  z-index: 5;
`;

const Content = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
`;
