import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { EditorState, Modifier, SelectionState } from "draft-js";
import Tooltip from "./Tooltip";
import Modal from "../../../../modals/Modal";
import SubmitBtn from "../../../../shared/buttons/Gradient";

import { ReactComponent as IconLink } from "../../../../../assets/icons/editor/link.svg";

function Link({ editorState, setEditorState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    text: "",
    url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    // Insert text
    const contentWithText = Modifier.replaceText(
      contentState,
      selection,
      values.text
    );

    // Create link entity
    const contentWithEntity = contentWithText.createEntity(
      "LINK",
      "MUTABLE",
      values.url
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();

    // Select text
    let selectionState = SelectionState.createEmpty();
    selectionState = selectionState.merge({
      anchorKey: selection.getAnchorKey(),
      anchorOffset: selection.getAnchorOffset(),
      focusKey: selection.getAnchorKey(),
      focusOffset: selection.getAnchorOffset() + values.text.length,
    });

    // Apply link entity to text
    const contentWithLink = Modifier.applyEntity(
      contentWithEntity,
      selectionState,
      entityKey
    );

    // Create state with the entity
    const stateWithLink = EditorState.push(editorState, contentWithLink);

    // Move focus to the end (after the newly inserted text)
    const stateWithFocus = EditorState.moveFocusToEnd(stateWithLink);

    // Update state
    setEditorState(stateWithFocus);
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <IconLink />
      </Button>

      <Tooltip name="Link" keys={["Ctrl", ":"]} />

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

const Button = styled.button``;

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
