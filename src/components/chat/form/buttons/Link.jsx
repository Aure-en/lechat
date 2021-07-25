import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import Modal from "../../../shared/Modal";
import SubmitBtn from "../../../shared/buttons/Gradient";
import useLink from "../../../../hooks/chat/useLink";

import IconLink from "../../../../assets/icons/editor/IconLink";

function Link({ editorState, setEditorState }) {
  const [isOpen, setIsOpen] = useState(false);

  const { values, errors, handleInputChange, handleSubmit } = useLink(
    editorState,
    setEditorState
  );

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        data-tip="Test"
        data-for="Link"
      >
        <IconLink strokeWidth={isOpen ? 1.5 : undefined} />
      </Button>

      <Tooltip name="Link" />

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form onSubmit={handleSubmit}>
          <Heading>Insert a link</Heading>

          <Field>
            <Label htmlFor="text">
              Text
              <Input
                type="text"
                id="text"
                name="text"
                placeholder="Enter the text"
                value={values.text}
                onChange={handleInputChange}
              />
            </Label>
            {errors.text && <Error>{errors.text}</Error>}
          </Field>

          <Field>
            <Label htmlFor="url">
              Link
              <Input
                type="text"
                id="url"
                name="url"
                placeholder="Enter the link"
                value={values.url}
                onChange={handleInputChange}
              />
            </Label>
            {errors.url && <Error>{errors.url}</Error>}
          </Field>

          <Submit>
            <SubmitBtn type="submit" disabled={!values.text || !values.url}>
              Insert Link
            </SubmitBtn>
          </Submit>
        </Form>
      </Modal>
    </>
  );
}

export default Link;

Link.propTypes = {
  editorState: PropTypes.shape({
    getSelection: PropTypes.func,
    getCurrentContent: PropTypes.func,
  }).isRequired,
  setEditorState: PropTypes.func.isRequired,
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  border-radius: 3px;
  color: ${(props) => props.theme.editor_text};
  background: ${(props) => props.$isOpen && props.theme.editor_bg_active};

  &:hover {
    background: ${(props) => !props.$isOpen && props.theme.editor_bg_hover};
  }
`;

const Heading = styled.h3`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.25rem;
  line-height: 2.75rem;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 20rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 0.825rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.input_border};
  padding: 0.5rem 0 0.25rem 0;

  &::placeholder {
    color: ${(props) => props.theme.input_border};
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.input_border_active};
  }
`;

const Submit = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Error = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 0.825rem;
`;
