import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as IconFile } from "../../../assets/icons/chat/file.svg";

function Drag({ onDragOver, onDragEnter, onDragLeave, onDrop, setFiles }) {
  const handleFilesDrop = (e) => {
    if (e.dataTransfer?.files.length > 0) {
      setFiles((prev) => [...prev, ...e.dataTransfer.files]);
    }
  };

  return (
    <DragZone
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, handleFilesDrop)}
    >
      <IconFile />
      <div>
        <H6>Share Files</H6>
        <P>
          Upload up to 5 files and <br /> 10MB per message
        </P>
      </div>
    </DragZone>
  );
}

export default Drag;

Drag.propTypes = {
  onDragOver: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
};

const DragZone = styled.div`
  position: absolute;
  width: calc(100% - 1rem); // Margin
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px dashed ${(props) => props.theme.bg_sidebar};
  border-radius: 3px;
  margin: 0.5rem;
  z-index: 10;
  text-align: center;

  & > svg {
    margin-right: 1rem;
    color: ${(props) => props.theme.text_secondary};
  }
`;

const H6 = styled.h6`
  color: ${(props) => props.theme.text_tertiary};
`;

const P = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.text_secondary};
`;
