import styled from "styled-components";

export const MyTooltip = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 175px;
  background-color: #8d93a1;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 0.5rem;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -87px;

  &::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: #8d93a1 transparent transparent transparent;
  }

  ${MyTooltip}:hover & {
    visibility: visible;
  }
`;
