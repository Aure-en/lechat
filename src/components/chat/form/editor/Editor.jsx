import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import "draft-js/dist/Draft.css";

function TextEditor({ editorState, setEditorState, onEnter }) {
  const onChange = (editorState) => {
    setEditorState(editorState);
    // send(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };

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

    // Cmd + Enter 🠒 onEnter (submit the form)
    if (e.keyCode === 13) {
      return "send";
    }

    if (
      e.keyCode === 13 &&
      hasCommandModifier(e) &&
      (RichUtils.getCurrentBlockType(editorState) === "blockquote" ||
        RichUtils.getCurrentBlockType(editorState) === "code-block")
    ) {
      return "block-newline";
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

    if (command === "send") {
      onEnter();
      return "handled";
    }

    const state = RichUtils.handleKeyCommand(editorState, command);
    if (state) setEditorState(state);
  };

  // Allows the user to create nested lists
  const handleTab = (e) => {
    e.preventDefault(); // Prevents focus from going to another element
    const blockType = RichUtils.getCurrentBlockType(editorState);
    if (
      blockType === "unordered-list-item" ||
      blockType === "ordered-list-item"
    ) {
      const state = RichUtils.onTab(e, editorState, 5);
      if (state) setEditorState(state);
    } else {
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
  const customBlockFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "code-block") return "code";
    if (type === "blockquote") return "quote";
    return "";
  };

  return (
    <Container>
      <Editor
        editorState={editorState}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        onTab={handleTab}
        onChange={onChange}
        blockStyleFn={customBlockFn}
      />
    </Container>
  );
}

export default TextEditor;

TextEditor.propTypes = {
  onEnter: PropTypes.func, // Action on pressing Enter.
};

TextEditor.defaultProps = {
  onEnter: undefined,
};

const Container = styled.div`
  min-height: 5rem;
`;
