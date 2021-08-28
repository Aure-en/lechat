import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../../shared/Modal";
import ImageLarge from "./ImageLarge";

// Small image preview. On click, create a modal with a huge version of the image.
function Image({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setIsModalOpen(true)}>
        <Preview
          src={`data:${image.contentType};base64,${Buffer.from(
            image.thumbnail || image.data
          ).toString("base64")}`}
          alt={image.name}
        />
      </Wrapper>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} isFullSize>
        <ImageLarge imageId={image._id} />
      </Modal>
    </>
  );
}

export default Image;

Image.propTypes = {
  image: PropTypes.shape({
    name: PropTypes.string,
    contentType: PropTypes.string,
    data: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
    thumbnail: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
    _id: PropTypes.string,
  }).isRequired,
};

const Wrapper = styled.li`
  position: relative;
  width: 4rem;
  height: 4rem;
  border: 1px solid ${(props) => props.theme.bg_button};
  background: ${(props) => props.theme.bg_card};
  border-radius: 3px;
  cursor: pointer;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
