import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import redraft from "redraft";
import renderers from "../../convert/renderers";

function Text({ text, edited }) {
  return (
    <>
      {!(
        JSON.parse(text)?.blocks.length === 1 &&
        !JSON.parse(text)?.blocks[0].text
      ) && (
        <div>
          {redraft(JSON.parse(text), renderers)}
          {edited && <Edited>(edited)</Edited>}
        </div>
      )}
    </>
  );
}

export default Text;

Text.propTypes = {
  text: PropTypes.string.isRequired,
  edited: PropTypes.bool,
};

Text.defaultProps = {
  edited: false,
};

const Edited = styled.small`
  font-size: 0.75rem;
  margin-left: 0.25rem;
  color: ${(props) => props.theme.text_secondary};
`;
