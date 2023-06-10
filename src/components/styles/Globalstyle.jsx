const { createGlobalStyle } = require("styled-components");
const { default: reset } = require("styled-reset");

export const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  :root {
    font-family: 'SUIT', sans-serif;
    background-color: #2861311f;
  }

  button {
    font-family: 'SUIT', sans-serif;
    cursor: pointer;
    padding: 0;
    border: 0;
    background-color: transparent;
  }

  img {
    vertical-align: top;
  }

  a {
    color: black;
    text-decoration: none;
  }

  input {
    border: 0;
    resize: none;
    &:focus {
      outline: none;
    }
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;
