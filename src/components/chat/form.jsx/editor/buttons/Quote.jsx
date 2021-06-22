import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RichUtils } from "draft-js";

import { ReactComponent as IconQuote } from "../../../../../assets/icons/editor/quote.svg";

function Quote({ editorState, setEditorState }) {
  const onMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "QUOTE"));
  };

  return (
    <Button
      type="button"
      onMouseDown={onMouseDown}
      $active={editorState.getCurrentInlineStyle().has("QUOTE")}
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

const Button = styled.button``;
