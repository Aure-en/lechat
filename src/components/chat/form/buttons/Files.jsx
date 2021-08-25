import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconPaperclip from "../../../../assets/icons/editor/IconPaperclip";

function Files({ addFiles }) {
  return (
    <Label htmlFor="file-upload">
      <div>
        <IconPaperclip />
        <Input
          type="file"
          id="file-upload"
          multiple
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = null;
          }}
        />
      </div>
    </Label>
  );
}

export default Files;

Files.propTypes = {
  // Add files to the form files state.
  addFiles: PropTypes.func.isRequired,
};

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  border-radius: 3px;
  color: ${(props) => props.theme.editor_text};
  background: ${(props) => props.$active && props.theme.editor_bg_active};
  cursor: pointer;
  width: 28px;
  height: 28px;

  &:hover {
    background: ${(props) => !props.$active && props.theme.editor_bg_hover};
  }

  & > div {
    transform: rotate(-45deg);
  }
`;
