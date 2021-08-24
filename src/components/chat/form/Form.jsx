import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { convertToRaw } from "draft-js";
import Editor from "./editor/Editor";
import useForm from "../../../hooks/chat/useForm";
import useDragAndDrop from "../../../hooks/shared/useDragAndDrop";
import Buttons from "./buttons/Buttons";
import Send from "./buttons/Send";
import Files from "./files/Files";
import Drag from "./Drag";

function Form({ location, message, setEditing, setMessages }) {
  const {
    editorState: text,
    setEditorState: setText,
    handleSubmit,
    files,
    setFiles,
    addFiles,
  } = useForm(location, message, setEditing, setMessages);
  const {
    dragging,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop();

  return (
    <FormContainer onSubmit={handleSubmit}>
      {dragging && !message && (
        <Drag
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          addFiles={addFiles}
        />
      )}
      <Editor
        editorState={text}
        setEditorState={setText}
        onEnter={handleSubmit}
      />
      <Files files={files} setFiles={setFiles} />
      <Row>
        <Buttons
          editorState={text}
          setEditorState={setText}
          addFiles={addFiles}
          files={files}
          isEditing={message}
        />
        <Send
          onEnter={handleSubmit}
          disabled={
            convertToRaw(text.getCurrentContent()).blocks.length === 1 &&
            !convertToRaw(text.getCurrentContent()).blocks[0].text &&
            files.length === 0
          }
        />
      </Row>
    </FormContainer>
  );
}

export default Form;

Form.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.shape({
      text: PropTypes.string,
      _id: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  setEditing: PropTypes.func,
  setMessages: PropTypes.func,
  location: PropTypes.shape({
    server: PropTypes.string,
    channel: PropTypes.string,
    conversation: PropTypes.string,
  }).isRequired,
};

Form.defaultProps = {
  message: undefined,
  setEditing: () => {},
  setMessages: () => {},
};

const FormContainer = styled.form`
  position: relative;
  border-top: 1px solid ${(props) => props.theme.bg_primary};
  word-break: break-all; // Prevent horizontal scrollbar
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  margin-top: 0.5rem;
`;
