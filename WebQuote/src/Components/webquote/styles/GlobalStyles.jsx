import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-blue: rgba(65, 105, 225, 1);
    --dark-blue: rgba(45, 77, 175, 1);
    --primary-purple: rgba(32, 3, 99, 1);
    --primary-orange: rgba(255, 149, 0, 1);
    --white: rgba(255, 255, 255, 1);
    --cream: #fff8dc;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Inter, sans-serif;
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export default GlobalStyles;
