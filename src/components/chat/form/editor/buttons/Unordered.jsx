import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import { ReactComponent as IconOrdered } from "../../../../../assets/icons/editor/unordered.svg";

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
      <IconOrdered />
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
