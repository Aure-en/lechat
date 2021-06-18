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
    font-family: 'Noto Sans JP', 'Trebuchet MS', sans-serif;
    font-size: .875rem;
    background: ${({ theme }) => theme.bg_app};
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.25rem;
    font-weight: 300;
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
    font-family: 'Noto Sans JP', 'Trebuchet MS', sans-serif;
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
    font-family: 'Noto Sans JP', 'Trebuchet MS', sans-serif;
  
    &:focus {
      outline: 1px solid transparent;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', 'Noto Sans JP', 'Trebuchet MS', sans-serif;
    font-weight: initial;
  }

`;

export default GlobalStyles;
