import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import IconUnderline from "../../../../assets/icons/editor/IconUnderline";

function Underline({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      style="UNDERLINE"
      name="Underline"
      keys={["Ctrl", "U"]}
    >
      <IconUnderline />
    </Button>
  );
}

export default Underline;

Underline.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
