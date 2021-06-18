import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

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
