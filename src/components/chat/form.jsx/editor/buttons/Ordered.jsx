import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RichUtils } from "draft-js";

import { ReactComponent as IconOrdered } from "../../../../../assets/icons/editor/ordered.svg";

function Unordered({ editorState, setEditorState }) {
  const onMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ORDERED"));
  };

  return (
    <Button
      type="button"
      onMouseDown={onMouseDown}
      $active={editorState.getCurrentInlineStyle().has("ORDERED")}
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

const Button = styled.button``;
