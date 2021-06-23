import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import { ReactComponent as IconOrdered } from "../../../../../assets/icons/editor/quote.svg";

function Quote({ editorState, setEditorState }) {
  return (
    <Button
      editorState={editorState}
      setEditorState={setEditorState}
      style="QUOTE"
      name="Quote"
      keys={["Ctrl", '"']}
    >
      <IconOrdered />
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
