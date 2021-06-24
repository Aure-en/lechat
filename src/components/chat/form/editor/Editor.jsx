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
  CompositeDecorator,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import "draft-js/dist/Draft.css";
import {
  Component as LinkComponent,
  strategy as linkStrategy,
} from "./entities/Link";
import {
  Component as UrlComponent,
  strategy as UrlStrategy,
} from "./entities/Url";
import Buttons from "./buttons/Buttons";

const decorator = new CompositeDecorator([
  {
    // Used to insert links
    strategy: linkStrategy,
    component: LinkComponent,
  },
  {
    // Detect urls and create a link from them
    strategy: UrlStrategy,
    component: UrlComponent,
  },
]);

function TextEditor({ send, prev, onEnter }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  const onChange = (editorState) => {
    setEditorState(editorState);
    send(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
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
      console.log("send");
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

  // If we provide a previous content (i.e : we are editing a comment / post), it is loaded in the Text Editor.
  useEffect(() => {
    if (!prev) return;
    const content = convertFromRaw(JSON.parse(prev));
    setEditorState(EditorState.createWithContent(content, decorator));
  }, [prev]);

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
      <Buttons editorState={editorState} setEditorState={setEditorState} />
    </Container>
  );
}

export default TextEditor;

TextEditor.propTypes = {
  send: PropTypes.func, // Send content to parent
  prev: PropTypes.string, // Previous content if we are editing a message
  onEnter: PropTypes.func, // Action on pressing Enter.
};

TextEditor.defaultProps = {
  send: () => {},
  prev: "",
  onEnter: undefined,
};

const Container = styled.div`
  border: 1px solid red;
`;
