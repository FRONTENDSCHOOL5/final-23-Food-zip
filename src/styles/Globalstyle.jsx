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
  }

  button {
    font-family: 'SUIT', sans-serif;
    cursor: pointer;
    padding: 0;
  }

  img {
    vertical-align: top;
  }
`;
