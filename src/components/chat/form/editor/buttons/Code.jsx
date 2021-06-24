import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import { ReactComponent as IconBold } from "../../../../../assets/icons/editor/code.svg";

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
      <IconBold />
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
