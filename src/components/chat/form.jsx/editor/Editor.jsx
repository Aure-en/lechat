import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  convertToRaw,
  convertFromRaw,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";

function TextEditor({ send, prev }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onChange = (editorState) => {
    setEditorState(editorState);
    send(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };

  // Allows the user to use keyboard shortcuts (ex: Ctrl + B to bold)
  const handleKeyCommand = (command) => {
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
        "      "
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
    if (type === "CODE") {
      return "code";
    }
    if (type === "QUOTE") {
      return "quote";
    }
    return "";
  };

  // If we provide a previous content (i.e : we are editing a comment / post), it is loaded in the Text Editor.
  useEffect(() => {
    if (!prev) return;
    const content = convertFromRaw(JSON.parse(prev));
    setEditorState(EditorState.createWithContent(content));
  }, [prev]);

  return (
    <Container>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onTab={handleTab}
        onChange={(editorState) => onChange(editorState)}
        blockStyleFn={customBlockFn}
      />
    </Container>
  );
}

export default TextEditor;

TextEditor.propTypes = {
  send: PropTypes.func, // Send content to parent
};

TextEditor.defaultProps = {
  send: () => {},
};

const Container = styled.div`
  border: 1px solid red;
`;
