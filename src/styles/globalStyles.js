/* fonts, colors etc used globally in the app */
import React from "react";
import { createGlobalStyle } from "styled-components";
import "./fontImports.css";

const GlobalStyle = createGlobalStyle`
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Source Sans Pro";
  background-color: whitesmoke;
  color: #2a2e30;
}
`;
export default GlobalStyle;
