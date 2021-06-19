import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as IconUpload } from "../../../assets/icons/general/upload.svg";

function Upload({ previous, send }) {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    send(image);
  }, [image]);

  return (
    <Label htmlFor="image" $previous={previous} $preview={preview}>
      {!preview && !previous && (
        <>
          <IconUpload />
          Upload
        </>
      )}
      <Input
        type="file"
        id="image"
        name="image"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </Label>
  );
}

export default Upload;

Upload.propTypes = {
  previous: PropTypes.shape({
    contentType: PropTypes.string,
    data: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
  send: PropTypes.func.isRequired,
};

Upload.defaultProps = {
  previous: undefined,
};

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
      return `url('data:${props.$previous.contentType};base64,${Buffer.from(
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
