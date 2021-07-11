import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { convertToRaw } from "draft-js";
import Editor from "./editor/Editor";
import useForm from "../../../hooks/chat/useForm";
import Buttons from "./buttons/Buttons";
import Send from "./buttons/Send";

function Form({ conversationId, message, setEditing, setMessages }) {
  const {
    editorState: text,
    setEditorState: setText,
    handleSubmit,
  } = useForm(conversationId, message, setEditing, setMessages);
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Editor
        editorState={text}
        setEditorState={setText}
        onEnter={handleSubmit}
      />
      <Row>
        <Buttons editorState={text} setEditorState={setText} />
        <Send
          onEnter={handleSubmit}
          disabled={
            convertToRaw(text.getCurrentContent()).blocks.length === 1 &&
            !convertToRaw(text.getCurrentContent()).blocks[0].text
          }
        />
      </Row>
    </FormContainer>
  );
}

export default Form;

Form.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    _id: PropTypes.string,
  }),
  setEditing: PropTypes.func,
  setMessages: PropTypes.func,
  conversationId: PropTypes.string,
};

Form.defaultProps = {
  message: undefined,
  conversationId: undefined,
  setEditing: () => {},
  setMessages: () => {},
};

const FormContainer = styled.form`
  border-top: 1px solid ${(props) => props.theme.bg_primary};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem 0.5rem 1rem;
  margin-top: 0.5rem;
`;
