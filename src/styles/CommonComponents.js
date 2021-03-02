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

export const PostContent = styled.textarea`
  margin-bottom: 15px;
  padding: 5px;
  width: 35vw;
  border: solid 1px lightgray;
  border-radius: 5px;
`;

export const StyledButton = styled.button`
  //display: inline;
  color: white;
  //background-color: #5b5f8e;
  background-color: #729380;
  //background-color: #5e9abb;
  padding: 5px 20px;
  border: transparent;
  border-radius: 5px;
  font-weight: bold;
  width: ${(props) => (props.formButton ? "100%" : "auto")};
`;

// export const DeleteButton = styled(StyledButton)`
//   //background-color: #cc8a53;
//   //background-color: #a76555;
//   background-color: #729380;
//   padding: 5px 10px;
// `;
// export const EditButton = styled(StyledButton)`
//   margin-right: 5px;
//   //background-color: #cbb49a;
//   background-color: #a8bb9e;
//   padding: 5px 10px;
// `;

export const PostButton = styled(StyledButton)`
  //background-color: #729380;
  background-color: #cbb49a;
  padding: 5px 10px;
`;

export const ToggleButton = styled(StyledButton)`
  background-color: #729380;
  padding: 5px 10px;
`;

export const IconWrapper = styled.div`
  display: inline-block;
  margin: 0 3px;
  :hover {
    cursor: pointer;
  }
`;
