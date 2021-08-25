import { useState } from "react";
import { EditorState, Modifier, SelectionState } from "draft-js";

// Insert a link in a message.
function useLink(editorState, setEditorState) {
  const initial = {
    text: "",
    url: "",
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  /**
   * Validation
   */
  const hasErrors = () => {
    let hasErrors;

    Object.keys(values).map((value) => {
      if (!values[value]) {
        hasErrors = true;
        setErrors((prev) => {
          return {
            ...prev,
            [value]: `${
              value[0].toUpperCase() + value.slice(1)
            } must be specified.`,
          };
        });
      }
    });

    return hasErrors;
  };

  const onSubmit = () => {
    setErrors(initial);

    if (hasErrors()) return false;

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

    return true;
  };

  return {
    values,
    errors,
    handleInputChange,
    onSubmit,
  };
}

export default useLink;
