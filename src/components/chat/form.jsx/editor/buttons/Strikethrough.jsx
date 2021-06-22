import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RichUtils } from "draft-js";

import { ReactComponent as IconStrike } from "../../../../../assets/icons/editor/strikethrough.svg";

function Strikethrough({ editorState, setEditorState }) {
  const onMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  return (
    <Button
      type="button"
      onMouseDown={onMouseDown}
      $active={editorState.getCurrentInlineStyle().has("STRIKETHROUGH")}
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

const Button = styled.button``;
