/* fonts, colors etc used globally in the app */

import { createGlobalStyle } from "styled-components";
import "../styles/fonts/fontImports.css";
import { colors } from "./colors";

const GlobalStyle = createGlobalStyle`
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Source Sans Pro";
  background-color: ${colors.bodyBackground};
  color: ${colors.textDark};
}
`;
export default GlobalStyle;
