import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RichUtils } from "draft-js";
import Tooltip from "./Tooltip";

function Button({ editorState, setEditorState, style, name, keys, children }) {
  const onMouseDown = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <>
      <Container
        type="button"
        onMouseDown={onMouseDown}
        $active={editorState.getCurrentInlineStyle().has(style)}
        data-tip
        data-for={name}
      >
        {children}
      </Container>

      <Tooltip name={name} keys={keys} />
    </>
  );
}

export default Button;

Button.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired, // Bold, italic...
  name: PropTypes.string.isRequired, // Displayed on tooltip
  keys: PropTypes.arrayOf(PropTypes.string), // Key binding
  children: PropTypes.node,
};

Button.defaultProps = {
  children: <></>,
  keys: [],
};

const Container = styled.button`
`;