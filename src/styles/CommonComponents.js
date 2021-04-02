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

export const PostInput = styled.textarea`
  margin-bottom: 15px;
  padding: 5px;
  width: 35vw;
  border: solid 1px lightgray;
  border-radius: 5px;
`;

export const StyledButton = styled.button`
  //display: inline;
  color: white;
  background-color: #423c45;
  padding: 5px 20px;
  border: transparent;
  border-radius: 15px;
  font-weight: bold;
  width: ${(props) => (props.formButton ? "100%" : "auto")};
`;

export const DeleteButton = styled(StyledButton)`
  background-color: #7d5e5e;
`;

export const PostButton = styled(StyledButton)`
  background-color: #8d93a1;
  padding: 5px 10px;
`;

export const ToggleButton = styled(StyledButton)`
  background-color: transparent;
  color: #8d93a1;
  padding: 5px 10px;
`;

export const ButtonIconWrapper = styled.div`
  display: inline-block;
  margin: 0 3px;
  :hover {
    cursor: pointer;
  }
`;

export const MyCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  min-width: 0;
  max-width: 800px;
  margin-bottom: 1em;
  padding: 1em 15%;
  background-color: #fff;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;
