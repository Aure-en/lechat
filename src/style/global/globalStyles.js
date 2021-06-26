import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  // Reset
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  body {
    font-family: 'Assistant', 'Trebuchet MS', sans-serif;
    background: ${({ theme }) => theme.bg_primary};
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.25rem;
    font-weight: 300;
  }

  #modal-root {
    position: absolute;
    top: 0;
    left: 0;
  }

  body,
  #root {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    font-family: 'Assistant', 'Trebuchet MS', sans-serif;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-weight: 300;

    &:focus {
      outline: 1px solid transparent;
    }
  }

  input {
    font-family: 'Assistant', 'Trebuchet MS', sans-serif;
  
    &:focus {
      outline: 1px solid transparent;
    }
  }

  h1, h2 {
    font-family: 'Playfair Display', 'Assistant', 'Trebuchet MS', sans-serif;
    font-weight: initial;
  }

  small {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.text_secondary};
  }

  // Text Editor
  .public-DraftEditor-content {
    min-height: 5rem;
    max-height: 15rem;
    overflow: auto;
    padding: 1rem;
    margin-right: 0.25rem; // Prevents scrollbar from sticking to the right
    overflow-wrap: anywhere;
  }

  .public-DraftEditor-content::-webkit-scrollbar {
    width: 0.4rem;
  }
  .public-DraftEditor-content::-webkit-scrollbar-track {
    background: none;
    margin: 0.5rem 0;
  }
  .public-DraftEditor-content::-webkit-scrollbar-thumb {
    border-radius: 5rem;
    background-color: ${(props) => props.theme.bg_sidebars};
  }

  .code {
    background: ${({ theme }) => theme.bg_code};
    padding: .5rem;
    margin: 1rem;
    font-family: "Monospace";
    font-size: 0.875rem;
  }

  .quote {
    position: relative;
    margin: 1rem 0 1rem 1rem;
  }

  .quote:before {
    position: absolute;
    content: '';
    border: 2px solid ${({ theme }) => theme.border_quote};
    border-radius: 15%;
    left: -.75rem;
    height: 100%;
  }
`;

export default GlobalStyles;
