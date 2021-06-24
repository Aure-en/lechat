import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import IconItalic from "../../../../../assets/icons/editor/IconItalic";

function Italic({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      style="ITALIC"
      name="Italic"
      keys={["Ctrl", "I"]}
    >
      <IconItalic />
    </Button>
  );
}

export default Italic;

Italic.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
