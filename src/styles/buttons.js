import styled from "styled-components";
import { colors } from "./colors";

export const StyledButton = styled.button`
  color: ${colors.textLight};
  background-color: ${colors.themeDark};
  padding: 5px 20px;
  border: transparent;
  border-radius: 7px;
  box-shadow: 3px 3px 10px 1px grey;
  font-family: "Source Sans Pro";
  font-size: 1rem;
  font-weight: 500;
  width: ${(props) => (props.formButton ? "100%" : "auto")};
`;

export const DeleteButton = styled(StyledButton)`
  background-color: ${colors.themeWarning};
`;

export const PostButton = styled(StyledButton)`
  background-color: ${colors.themeLight};
  padding: 5px 8px;
  width: 100px;
`;

export const EditButton = styled(StyledButton)`
  background-color: ${colors.themeLight};
  padding: 2px 7px;
  margin: 0 2px;
  font-weight: normal;
  font-size: 0.85rem;
`;

export const ToggleButton = styled(StyledButton)`
  background-color: transparent;
  box-shadow: none;
  color: ${colors.themeLight};
  padding: 5px 10px;
`;
