import React from "react";
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

function Buttons({ editorState, setEditorState }) {
  return (
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
      <Unordered editorState={editorState} setEditorState={setEditorState} />
      <Quote editorState={editorState} setEditorState={setEditorState} />
    </Container>
  );
}

export default Buttons;

const Container = styled.div`
  display: flex;
`;

Buttons.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
