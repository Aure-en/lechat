import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import IconUnordered from "../../../../../assets/icons/editor/IconUnordered";

function Unordered({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      display="block"
      style="unordered-list-item"
      name="Unordered"
      keys={["Ctrl", "*"]}
    >
      <IconUnordered />
    </Button>
  );
}

export default Unordered;

Unordered.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
