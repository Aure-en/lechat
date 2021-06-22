import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RichUtils } from "draft-js";

import { ReactComponent as IconUnordered } from "../../../../../assets/icons/editor/unordered.svg";

function Unordered({ editorState, setEditorState }) {
  const onMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNORDERED"));
  };

  return (
    <Button
      type="button"
      onMouseDown={onMouseDown}
      $active={editorState.getCurrentInlineStyle().has("UNORDERED")}
    >
      <IconUnordered />
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
