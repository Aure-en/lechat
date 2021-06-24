import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import IconQuote from "../../../../assets/icons/editor/IconQuote";

function Quote({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      display="block"
      style="blockquote"
      name="Quote"
      keys={["Ctrl", '"']}
    >
      <IconQuote />
    </Button>
  );
}

export default Quote;

Quote.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};
