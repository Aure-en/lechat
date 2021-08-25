import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import File from "./File";
import Image from "./Image";

function Files({ message, files }) {
  return (
    <List>
      {files.map((file, index) => {
        if (file.contentType.split("/")[0] === "image") {
          return <Image image={file} message={message} index={index} />;
        }
        return <File file={file} messageId={message._id} index={index} />;
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
  message: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

const List = styled.ul`
  display: flex;
  margin: 1rem;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 0.75rem;
  grid-column: 2;
`;
