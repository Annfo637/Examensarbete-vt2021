import styled from "styled-components";

export const StyledForm = styled.div`
  max-width: 400px;
`;
export const StyledLabel = styled.label`
  margin-bottom: 5px;
`;
export const StyledInput = styled.input`
  //display: inline-block;
  margin-bottom: 15px;
  padding: 5px 20px;
  border: solid 1px lightgray;
  border-radius: 5px;
`;
export const StyledButton = styled.button`
  //display: inline;
  color: white;
  background-color: #5b5f8e;
  padding: 5px 20px;
  border-radius: 5px;
  font-weight: bold;
  width: ${(props) => (props.formButton ? "100%" : "auto")};
`;
