import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useSWR from "swr";
import IconLoad from "../../../assets/icons/general/IconLoad";

/**
 * Component displaying an image sent as huge as possible.
 * The message and image preview only contains a thumbnail if the picture if small.
 * ImageLarge fetches the fullsize picture on the DB and displays it.
 */
function ImageLarge({ imageId }) {
  const { data: image, loading } = useSWR(
    `${process.env.REACT_APP_SERVER}/files/${imageId}`
  );

  return (
    <Container>
      {loading && <IconLoad />}
      {image && (
        <Image
          src={`data:${image.contentType};base64,${Buffer.from(
            image.data
          ).toString("base64")}`}
          alt={image.name}
        />
      )}
    </Container>
  );
}

export default ImageLarge;

ImageLarge.propTypes = {
  imageId: PropTypes.string.isRequired,
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
