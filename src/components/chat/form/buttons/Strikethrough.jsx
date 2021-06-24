import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import IconStrike from "../../../../assets/icons/editor/IconStrike";

function Strikethrough({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      style="STRIKETHROUGH"
      name="Strikethrough"
      keys={["Ctrl", "-"]}
    >
      <IconStrike />
    </Button>
  );
}

export default Strikethrough;

Strikethrough.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
