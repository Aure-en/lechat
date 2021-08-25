import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as IconFile } from "../../../assets/icons/chat/download.svg";

// File - can be downloaded on click.
function File({ file, messageId, index }) {
  const formatSize = (size) => {
    if (size < 1000) return `${size} bytes`;
    if (size < 10 ** 6) return `${(size / 10 ** 3).toFixed(2)} kB`;
    return `${(size / 10 ** 6).toFixed(2)} MB`;
  };

  return (
    <Wrapper title={file.name}>
      <a
        href={`${process.env.REACT_APP_SERVER}/messages/${messageId}/files/${index}`}
        download
      >
        <IconFile />
        <div>
          <Name>{file.name}</Name>
          <Size>{formatSize(file.size)}</Size>
        </div>
      </a>
    </Wrapper>
  );
}

export default File;

File.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  messageId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const Wrapper = styled.li`
  cursor: pointer;

  & > a {
    position: relative;
    display: flex;
    grid-template-columns: auto 1fr;
    align-items: center;
    width: 10rem;
    height: 4rem;
    border: 1px solid ${(props) => props.theme.bg_button};
    background: ${(props) => props.theme.bg_secondary};
    border-radius: 3px;
    overflow: hidden;
    padding: 0 0.5rem;
  }

  & div {
    padding-left: 0.25rem;
  }
`;

const Name = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 6rem;
  font-size: 0.935rem;
`;

const Size = styled.div`
  font-size: 0.813rem;
  color: ${(props) => props.theme.text_secondary};
`;
