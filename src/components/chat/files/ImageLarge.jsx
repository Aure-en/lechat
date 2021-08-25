import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Component displaying an image sent as huge as possible.
 */
function ImageLarge({ image }) {
  return (
    <Container>
      <Image
        src={`data:${image.contentType};base64,${Buffer.from(
          image.data
        ).toString("base64")}`}
        alt={image.name}
      />
    </Container>
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

const Container = styled.div`
  min-width: 10rem;
  min-height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  display: block;
  max-width: 90vw;
  max-height: 90vh;
  min-height: 10rem;
  min-width: 10rem;
  height: auto;
  object-fit: cover;
`;
