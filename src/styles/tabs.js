import styled from "styled-components";

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
  width: 25%;
  position: relative;

  margin-right: 0.1em;
  font-weight: bold;
  color: white;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "#85766d" : "#9c9d9a")};
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
