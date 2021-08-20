import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as IconFile } from "../../../../assets/icons/editor/file.svg";
import IconClose from "../../../../assets/icons/general/IconClose";

/**
 * File preview before it is sent in a message.
 */
function File({ file, remove }) {
  console.log(file);
  const [hovered, setHovered] = useState(false);

  const formatSize = (size) => {
    if (size < 1000) return `${size} bytes`;
    if (size < 10 ** 6) return `${(size / 10 ** 3).toFixed(2)} kB`;
    return `${(size / 10 ** 6).toFixed(2)} MB`;
  };

  return (
    <Wrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <IconFile />
      <div>
        <Name>{file.name}</Name>
        <Size>{formatSize(file.size)}</Size>
      </div>

      {hovered && (
        <Button type="button" onClick={remove}>
          <IconClose strokeWidth={1.25} />
        </Button>
      )}
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
  remove: PropTypes.func.isRequired,
};

const Wrapper = styled.li`
  position: relative;
  display: flex;
  grid-template-columns: auto 1fr;
  align-items: center;
  width: 10rem;
  height: 4rem;
  border: 1px solid ${(props) => props.theme.bg_button};
  background: url(${(props) => props.$src});
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  overflow: hidden;
  padding: 0 0.5rem;

  & > div {
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

const Button = styled.button`
  position: absolute;
  right: -0.1rem;
  top: -0.1rem;
  color: ${(props) => props.theme.bg_sidebar};

  &:hover {
    color: ${(props) => props.theme.text_quaternary};
  }
`;
