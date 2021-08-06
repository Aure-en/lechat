import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import { useLocation } from "react-router-dom";
import {
  ContentBlock,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  genKey,
} from "draft-js";
import "draft-js/dist/Draft.css";

function TextEditor({ editorState, setEditorState, onEnter }) {
  const editorRef = useRef(); // Used to auto-focus on load.

  const onChange = (editorState) => {
    const currentContentTextLength = editorState
      .getCurrentContent()
      .getPlainText().length;
    const newContentTextLength = editorState
      .getCurrentContent()
      .getPlainText().length;

    if (currentContentTextLength === 1 && newContentTextLength === 1) {
      /**
       * Issue: After the first message sent, when typing in draft, the cursor moves back
       * to the beginning after typing the first character.
       * 🠒 Workaround: Force the selection to go to the end after typing the first character.
       */
      setEditorState(EditorState.moveFocusToEnd(editorState));
    } else {
      setEditorState(editorState);
    }
  };

  const themeContext = useContext(ThemeContext); // To style customStyleMap
  const location = useLocation();

  const keyBindingFn = (e) => {
    const { hasCommandModifier } = KeyBindingUtil;
    // Cmd + 1 🠒 Ordered List
    if (e.keyCode === 97 && hasCommandModifier(e)) {
      return "ordered-list-item";
    }

    // Cmd + * 🠒 Unordered List
    if (e.keyCode === 220 && hasCommandModifier(e)) {
      return "unordered-list-item";
    }

    // Cmd + " 🠒 Quote
    if (e.keyCode === 51 && hasCommandModifier(e)) {
      return "blockquote";
    }

    // Cmd + ^ 🠒 Code
    if (e.keyCode === 219 && hasCommandModifier(e)) {
      return "code-block";
    }

    // Cmd + ? 🠒 Spoiler
    if (e.keyCode === 188 && hasCommandModifier(e)) {
      return "spoiler";
    }

    // Ctrl + Enter 🠒 Jump to a new line if we are in a styled block
    if (
      e.keyCode === 13 &&
      hasCommandModifier(e) &&
      (RichUtils.getCurrentBlockType(editorState) === "blockquote" ||
        RichUtils.getCurrentBlockType(editorState) === "code-block")
    ) {
      return "block-newline";
    }

    // Ctrl + Enter 🠒 Create a new block if we are not in a styled block
    if (e.keyCode === 13 && hasCommandModifier(e)) {
      return "new-block";
    }

    // Enter 🠒 onEnter (submit the form)
    if (
      e.keyCode === 13 &&
      RichUtils.getCurrentBlockType(editorState) === "unstyled"
    ) {
      return "send";
    }
    return getDefaultKeyBinding(e);
  };

  // Allows the user to use keyboard shortcuts (ex: Ctrl + $ to write code)
  const handleKeyCommand = (command) => {
    if (
      command === "ordered-list-item" ||
      command === "unordered-list-item" ||
      command === "blockquote" ||
      command === "code-block"
    ) {
      setEditorState(RichUtils.toggleBlockType(editorState, command));
      return "handled";
    }

    if (command === "block-newline") {
      setEditorState(RichUtils.insertSoftNewline(editorState));
      return "handled";
    }

    if (command === "spoiler") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "SPOILER"));
    }

    if (command === "new-block") {
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const textWithEntity = Modifier.splitBlock(currentContent, selection);
      setEditorState(
        EditorState.push(editorState, textWithEntity, "split-block")
      );
    }

    if (command === "send") {
      onEnter();
      return "handled";
    }

    const state = RichUtils.handleKeyCommand(editorState, command);
    if (state) setEditorState(state);
  };

  // Used to not create blocks on every single new line on paste
  // when the user is pasting in a styled block.
  const handlePastedText = (text) => {
    if (RichUtils.getCurrentBlockType(editorState) !== "unstyled") {
      // Insert text
      const contentWithPaste = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        text
      );

      // Create state with the text
      const stateWithPaste = EditorState.push(editorState, contentWithPaste);
      setEditorState(stateWithPaste);
      return true;
    }
    return false;
  };

  // Allows the user to create nested lists
  const handleTab = (e) => {
    e.preventDefault(); // Prevents focus from going to another element
    const blockType = RichUtils.getCurrentBlockType(editorState);
    if (
      blockType === "unordered-list-item" ||
      blockType === "ordered-list-item"
    ) {
      // If we are in a list, tab nests the lists.
      const state = RichUtils.onTab(e, editorState, 5);
      if (state) setEditorState(state);
    } else {
      // Otherwise, just acts like a normal tab.
      const newContent = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        "  "
      );
      const state = EditorState.push(
        editorState,
        newContent,
        "insert-fragment"
      );
      setEditorState(state);
    }
  };

  // Sets up custom blocks (quote, code)
  function customBlockFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "code-block") return "code";
    if (type === "blockquote") return "quote";
    return "";
  }

  // Sets up custom inline styles (spoiler)
  const customStyleMap = {
    SPOILER: {
      backgroundColor: themeContext.bg_primary,
    },
  };

  // Autofocus the text editor
  useEffect(() => {
    editorRef.current.focus();
  }, [location]);

  return (
    <Container>
      <Editor
        ref={editorRef}
        editorState={editorState}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        onTab={handleTab}
        onChange={onChange}
        blockStyleFn={customBlockFn}
        customStyleMap={customStyleMap}
        handlePastedText={handlePastedText}
      />
    </Container>
  );
}

export default TextEditor;

TextEditor.propTypes = {
  onEnter: PropTypes.func, // Action on pressing Enter.
  editorState: PropTypes.shape({
    getCurrentContent: PropTypes.func,
    getSelection: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};

TextEditor.defaultProps = {
  onEnter: undefined,
};

const Container = styled.div`
  min-height: 7rem; // Avoid size change on inserting a new styled block.
`;
