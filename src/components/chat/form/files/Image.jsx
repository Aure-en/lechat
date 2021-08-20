import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconClose from "../../../../assets/icons/general/IconClose";

/**
 * Image preview before it is sent in a message.
 */
function Image({ image, remove }) {
  const [preview, setPreview] = useState();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    URL.revokeObjectURL(image);
    setPreview(URL.createObjectURL(image));
  }, [image]);

  return (
    <Wrapper
      $src={preview}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <Button type="button" onClick={remove}>
          <IconClose strokeWidth={1.25} />
        </Button>
      )}
    </Wrapper>
  );
}

export default Image;

Image.propTypes = {
  image: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

const Wrapper = styled.li`
  position: relative;
  width: 4rem;
  height: 4rem;
  border: 1px solid ${(props) => props.theme.bg_button};
  background: url(${(props) => props.$src});
  background-position: center;
  background-size: cover;
  border-radius: 3px;

  &:hover:before {
    content: "";
    display: inline-block;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.bg_primary};
    opacity: 0.5;
  }
`;

const Button = styled.button`
  position: absolute;
  right: -0.1rem;
  top: -0.1rem;
  color: ${(props) => props.theme.bg_sidebar};

  &:hover {
    color: ${(props) => props.theme.text_quaternary};
  }
`;
