import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RichUtils } from "draft-js";

function Button({ editorState, setEditorState, style, name, keys, children }) {
  const onMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <Container
      type="button"
      onMouseDown={onMouseDown}
      $active={editorState.getCurrentInlineStyle().has(style)}
    >
      {children}
    </Container>
  );
}

export default Button;

Button.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Button.defaultProps = {
  children: <></>,
};

const Container = styled.button``;
