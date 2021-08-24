import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Image preview before it is sent in a message.
 */
function Image({ image, messageId, index }) {
  return (
    <Wrapper>
      <a
        href={`${process.env.REACT_APP_SERVER}/messages/${messageId}/files/${index}`}
        download
      >
        <Img
          src={`data:${image.contentType};base64,${Buffer.from(
            image.data
          ).toString("base64")}`}
          alt={image.name}
        />
      </a>
    </Wrapper>
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
  messageId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const Wrapper = styled.li`
  position: relative;
  width: 4rem;
  height: 4rem;
  border: 1px solid ${(props) => props.theme.bg_button};
  background: ${(props) => props.theme.bg_secondary};
  border-radius: 3px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
