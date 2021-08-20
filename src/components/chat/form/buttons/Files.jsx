import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import IconPaperclip from "../../../../assets/icons/editor/IconPaperclip";

function Files({ files, setFiles }) {
  const handleChange = (e) => {
    if ([...files, ...e.target.files].length > 5) {
      return console.log("You can only send up to 5 files in a message.");
    }

    if (
      [...files, ...e.target.files]
        .map((file) => file.size)
        .reduce((sum, current) => sum + current, 0) >
      10 ** 7
    ) {
      return console.log("You can only send up to 10MB of files in a message.");
    }

    setFiles((prev) => [...prev, ...e.target.files]);
  };
  return (
    <Label htmlFor="file-upload">
      <div>
        <IconPaperclip />
        <Input type="file" id="file-upload" multiple onChange={handleChange} />
      </div>
    </Label>
  );
}

export default Files;

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
