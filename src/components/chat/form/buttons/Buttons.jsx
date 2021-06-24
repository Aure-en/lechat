import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Bold from "./Bold";
import Code from "./Code";
import Italic from "./Italic";
import Link from "./Link";
import Ordered from "./Ordered";
import Quote from "./Quote";
import Strikethrough from "./Strikethrough";
import Unordered from "./Unordered";

import IconChevron from "../../../../assets/icons/general/IconChevron";
import IconNotebook from "../../../../assets/icons/editor/IconNotebook";

function Buttons({ editorState, setEditorState }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <IconNotebook />
        <Icon $isOpen={isOpen}>
          <IconChevron />
        </Icon>
      </Button>

      {isOpen && (
        <Container>
          <Bold editorState={editorState} setEditorState={setEditorState} />
          <Italic editorState={editorState} setEditorState={setEditorState} />
          <Strikethrough
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <Link editorState={editorState} setEditorState={setEditorState} />
          <Code editorState={editorState} setEditorState={setEditorState} />
          <Ordered editorState={editorState} setEditorState={setEditorState} />
          <Unordered
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <Quote editorState={editorState} setEditorState={setEditorState} />
        </Container>
      )}
    </Wrapper>
  );
}

export default Buttons;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  & > button {
    margin-right: 0.25rem;
  }

  & > button:last-child {
    margin-right: 0;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  min-height: 2rem; // Fixing min height to avoid "jump" when other buttons appear (might be a tad taller)
  color: ${(props) => props.theme.editor_text};
`;

const Icon = styled.span`
  position: relative;
  top: ${(props) => (props.$isOpen ? "0" : "2px")};
  transition: all 0.3s linear;
  transform: ${(props) => props.$isOpen && "rotate(-90deg)"};
`;

Buttons.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
