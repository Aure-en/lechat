import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import IconOrdered from "../../../../../assets/icons/editor/IconOrdered";

function Ordered({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      display="block"
      style="ordered-list-item"
      name="Ordered"
      keys={["Ctrl", "1"]}
    >
      <IconOrdered />
    </Button>
  );
}

export default Ordered;

Ordered.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
