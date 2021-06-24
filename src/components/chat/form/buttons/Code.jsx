import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import IconCode from "../../../../assets/icons/editor/IconCode";

function Code({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      display="block"
      style="code-block"
      name="Code"
      keys={["Ctrl", "^"]}
    >
      <IconCode />
    </Button>
  );
}

export default Code;

Code.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
