import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

export function Component({ contentState, entityKey, children }) {
  const url = contentState.getEntity(entityKey).getData();
  return (
    <>
      <Link
        href={url}
        // Must add a on click event because links in contentEditable don't work by default.
        onClick={(e) => window.open(e.target.closest("a").href)}
        data-tip={url}
      >
        {children}
      </Link>
      <ReactTooltip />
    </>
  );
}

export const strategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

const Link = styled.a`
  color: red;
  font-size: 2rem;
`;
