import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RichUtils } from "draft-js";

import { ReactComponent as IconCode } from "../../../../../assets/icons/editor/code.svg";

function Code({ editorState, setEditorState }) {
  const onMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"));
  };

  return (
    <Button
      type="button"
      onMouseDown={onMouseDown}
      $active={editorState.getCurrentInlineStyle().has("CODE")}
    >
      <IconCode />
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

const Button = styled.button``;
