import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "./Image";
import File from "./File";

function Files({ files, setFiles }) {
  const remove = (index) => {
    setFiles((prev) =>
      [...prev].filter((file, fileIndex) => index !== fileIndex)
    );
  };

  return (
    <List>
      {files.map((file, index) => {
        if (file.type.split("/")[0] === "image") {
          return (
            <Image key={file.name} image={file} remove={() => remove(index)} />
          );
        }
        return (
          <File key={file.name} file={file} remove={() => remove(index)} />
        );
      })}
    </List>
  );
}

export default Files;

Files.propTypes = {
  // Files from <input type="file" />
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      size: PropTypes.number,
      type: PropTypes.string,
    })
  ).isRequired,

  // State function that updates the files.
  setFiles: PropTypes.func.isRequired,
};

const List = styled.ul`
  display: flex;
  margin: 0 1rem;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 0.75rem;
`;
