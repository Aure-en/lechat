import React, { Children, cloneElement, isValidElement } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RichUtils } from "draft-js";
import Tooltip from "./Tooltip";

function Button({
  editorState,
  setEditorState,
  display,
  style,
  name,
  keys,
  children,
}) {
  const onMouseDown = (e) => {
    e.preventDefault();
    const state =
      display === "inline"
        ? RichUtils.toggleInlineStyle(editorState, style)
        : RichUtils.toggleBlockType(editorState, style);
    setEditorState(state);
  };

  return (
    <>
      <Container
        type="button"
        onMouseDown={onMouseDown}
        $active={
          display === "inline"
            ? editorState.getCurrentInlineStyle().has(style)
            : RichUtils.getCurrentBlockType(editorState) === style
        }
        data-tip
        data-for={name}
      >
        {/* Pass active props to children to
        apply a different style to the svg when
        the button is active */}
        {Children.map(children, (child) => {
          let active;
          if (
            (display === "inline" &&
              editorState.getCurrentInlineStyle().has(style)) ||
            (display === "block" &&
              RichUtils.getCurrentBlockType(editorState) === style)
          ) {
            active = true;
          }
          if (isValidElement(child)) {
            return cloneElement(child, {
              strokeWidth: active && 1.5,
            });
          }
          return child;
        })}
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
  display: PropTypes.string,
};

Button.defaultProps = {
  children: <></>,
  keys: [],
  display: "inline",
};

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  border-radius: 3px;
  color: ${(props) => props.theme.editor_text};
  background: ${(props) => props.$active && props.theme.editor_bg_active};

  &:hover {
    background: ${(props) => !props.$active && props.theme.editor_bg_hover};
  }
`;
