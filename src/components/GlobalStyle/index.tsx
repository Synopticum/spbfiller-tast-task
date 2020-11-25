import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const commonOverrides = `
  *, *:before, *:after { box-sizing: inherit; }

  html {
    height: 100%;
    overflow: auto;
  }

  body {
    font-family: 'PT Sans', sans-serif, Arial, "Helvetica Neue", sans-serif;
    box-sizing: border-box;
    word-break: break-word;
    text-decoration-skip-ink: none;
    overflow: auto;
    height: 100%;
  }

  #main {
    min-height: 100%;
    min-width: 960px;
    max-width: 1260px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  a {
    margin-left: 5px;
    color: #337ab7;
  }

  input, textarea, button { font-family: "Roboto",Arial,"Helvetica Neue",sans-serif; }
  input:active, textarea:active, button:active, input:focus, textarea:focus, button:focus { outline: none; }

  input,
  input:hover,
  input:focus,
  input:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  input[type=text]::-ms-clear {
    display: none;
  }
  input[type=password]::-ms-reveal {
    display: none;
  }
`;

const globalStyle = createGlobalStyle`
  ${reset}
  ${commonOverrides}
`;

export default globalStyle;
