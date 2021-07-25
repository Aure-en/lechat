import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import IconSpoiler from "../../../../assets/icons/editor/IconSpoiler";

function Bold({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      style="SPOILER"
      name="Spoiler"
      keys={["Ctrl", "?"]}
    >
      <IconSpoiler />
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
