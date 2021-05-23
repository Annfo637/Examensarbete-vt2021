import styled from "styled-components";
import { colors } from "./colors";

export const MyTooltip = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 175px;
  background-color: ${colors.themeLight};
  color: ${colors.textLight};
  text-align: center;
  border-radius: 5px;
  padding: 0.5rem;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -87px;
  opacity: 0;
  transition: opacity 1s;

  &::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: ${colors.themeLight} transparent transparent transparent;
  }

  ${MyTooltip}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
