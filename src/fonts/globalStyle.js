import { createGlobalStyle } from "styled-components";
import SingleDays from "../fonts/SingleDay-Regular.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SingleDays';
    src: url(${SingleDays}) format('truetype');
    font-weight: 400; 
    font-style: normal;
  }
  input[type="date"]::before {
    content: 'MM/DD/YYYY';
    position: absolute;
    margin-left: 10px;
    color: #999;
  }
  input[type="date"]:valid::before {
    content: '';
}
`;
