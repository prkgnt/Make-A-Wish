import { createGlobalStyle } from "styled-components";
import SingleDays from "../fonts/SingleDay-Regular.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SingleDays';
    src: url(${SingleDays}) format('truetype');
    font-weight: 400; 
    font-style: normal;
  }
`;
