import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as IconUpload } from "../../../assets/icons/general/upload.svg";

function Upload({ id, previous, send, message }) {
  const [preview, setPreview] = useState();

  return (
    <Field>
      <Label htmlFor={`image-${id}`} $previous={previous} $preview={preview}>
        {!preview && !previous && (
          <>
            <IconUpload />
            Upload
          </>
        )}
        <Input
          type="file"
          id={`image-${id}`}
          name={`image-${id}`}
          onChange={(e) => {
            if (e.target.files.length > 0) {
              send(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
      </Label>
      {message && <small>{message}</small>}
    </Field>
  );
}

export default Upload;

Upload.propTypes = {
  // Previous image.
  previous: PropTypes.shape({
    type: PropTypes.string,
    data: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
  // To identify the input when there are several on the same page
  id: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
  message: PropTypes.string, // Message displayed next to input.
};

Upload.defaultProps = {
  previous: undefined,
  message: undefined,
};

const Field = styled.div`
  display: flex;
  align-items: center;

  & > small {
    margin-left: 2rem;
    color: ${(props) => props.theme.text_quaternary};
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: ${(props) =>
    !props.$preview && !props.$previous && `2px dashed ${props.theme.border}`};
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 400;
  cursor: pointer;
  background: ${(props) => {
    if (props.$preview) return `url(${props.$preview})`;
    if (props.$previous && !props.$preview)
      return `url('data:${props.$previous.type};base64,${Buffer.from(
        props.$previous.data
      ).toString("base64")}')`;
  }};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Input = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;
`;
