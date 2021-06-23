import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import { ReactComponent as IconOrdered } from "../../../../../assets/icons/editor/ordered.svg";

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
