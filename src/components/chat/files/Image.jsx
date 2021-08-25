import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../../shared/Modal";
import ImageLarge from "./ImageLarge";

function Image({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setIsModalOpen(true)}>
        <Preview
          src={`data:${image.contentType};base64,${Buffer.from(
            image.data
          ).toString("base64")}`}
          alt={image.name}
        />
      </Wrapper>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} isFullSize>
        <ImageLarge image={image} />
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
  }).isRequired,
};

const Wrapper = styled.li`
  position: relative;
  width: 4rem;
  height: 4rem;
  border: 1px solid ${(props) => props.theme.bg_button};
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 3px;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
