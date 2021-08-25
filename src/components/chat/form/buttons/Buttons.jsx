import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import Bold from "./Bold";
import Underline from "./Underline";
import Italic from "./Italic";
import Strikethrough from "./Strikethrough";
import Spoiler from "./Spoiler";
import Link from "./Link";
import Code from "./Code";
import Ordered from "./Ordered";
import Unordered from "./Unordered";
import Quote from "./Quote";
import Files from "./Files";

import IconChevron from "../../../../assets/icons/general/IconChevron";
import IconNotebook from "../../../../assets/icons/editor/IconNotebook";

function Buttons({ editorState, setEditorState, files, addFiles, isEditing }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Wrapper>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <IconNotebook />
        <Icon $isOpen={isOpen}>
          <IconChevron />
        </Icon>
      </Button>

      <Transition in={isOpen} timeout={100}>
        {(state) => (
          <Container $state={state}>
            <Bold editorState={editorState} setEditorState={setEditorState} />
            <Underline
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Italic editorState={editorState} setEditorState={setEditorState} />
            <Strikethrough
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Spoiler
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Link editorState={editorState} setEditorState={setEditorState} />
            <Code editorState={editorState} setEditorState={setEditorState} />
            <Ordered
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Unordered
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Quote editorState={editorState} setEditorState={setEditorState} />
            {!isEditing && <Files files={files} addFiles={addFiles} />}
          </Container>
        )}
      </Transition>
    </Wrapper>
  );
}

export default Buttons;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: ${(props) => (props.$state === "exited" ? "none" : "flex")};
  transform: translateX(
    ${(props) => (props.$state === "entered" ? "0" : "-5%")}
  );
  opacity: ${(props) => (props.$state === "entered" ? "1" : "0")};
  transition: all 0.3s linear;
  align-items: center;
  flex-wrap: wrap;

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
  background: ${(props) => props.theme.bg_secondary};
  z-index: 2;
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
