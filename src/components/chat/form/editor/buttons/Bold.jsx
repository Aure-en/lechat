import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import { ReactComponent as IconBold } from "../../../../../assets/icons/editor/bold.svg";

function Bold({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      style="BOLD"
      name="Bold"
      keys={["Ctrl", "B"]}
    >
      <IconBold />
    </Button>
  );
}

export default Bold;

Bold.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
