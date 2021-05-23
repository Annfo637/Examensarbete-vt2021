import styled from "styled-components";
import { colors } from "./colors";

export const Tabs = styled.div`
  overflow: hidden;
  height: 3em;
  width: 100%;
`;

export const Tab = styled.button`
  border: none;
  border-radius: 8px 8px 0 0;
  outline: none;
  cursor: pointer;
  width: 30%;
  position: relative;

  margin-right: 0.1em;
  font-weight: 600;
  color: white;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) =>
    props.active ? colors.themeDark : colors.themeLight};
  height: ${(props) => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.3s ease-in-out;

  :hover {
    background-color: lightgray;
  }
`;

export const Content = styled.div`
  display: ${(props) => (props.active ? "" : "none")};
  width: 100%;
`;
