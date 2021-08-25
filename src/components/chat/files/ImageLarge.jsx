import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Component displaying an image sent as huge as possible.
 */
function ImageLarge({ image }) {
  return (
    <Image
      src={`data:${image.contentType};base64,${Buffer.from(image.data).toString(
        "base64"
      )}`}
      alt={image.name}
    />
  );
}

export default ImageLarge;

ImageLarge.propTypes = {
  image: PropTypes.shape({
    name: PropTypes.string,
    contentType: PropTypes.string,
    data: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
};

const Image = styled.img`
  display: block;
  max-width: 90vw;
  max-height: 90vh;
  height: auto;
  object-fit: cover;
`;
