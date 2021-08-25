import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/** Automatically detected link entity in text message. */
export function Component({ children }) {
  return (
    <>
      <Link
        href={children[0].props.text}
        // Must add a on click event because links in contentEditable don't work by default.
        onClick={(e) => window.open(e.target.closest("a").href)}
      >
        {children}
      </Link>
    </>
  );
}

export const strategy = (contentBlock, callback) => {
  const regex =
    /([a-z0-9-]+\:\/+)([^\/\s]+)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#\r\n]*)#?([^ \#\r\n]*)/gim;
  const text = contentBlock.getText();
  let match;
  while ((match = regex.exec(text))) {
    callback(match.index, match.index + match[0].length);
  }
};

Component.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        text: PropTypes.string,
      }),
    })
  ).isRequired,
};

const Link = styled.a`
  color: ${(props) => props.theme.text_link};

  &:hover {
    color: ${(props) => props.theme.text_link_hover};
    text-decoration: underline;
  }
`;
