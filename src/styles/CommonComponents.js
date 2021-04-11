import styled from "styled-components";

export const StyledLabel = styled.label`
  margin-bottom: 5px;
`;
export const StyledInput = styled.input`
  margin-bottom: 15px;
  padding: 5px 20px;
  border: solid 1px lightgray;
  border-radius: 5px;
`;

export const PostInput = styled.textarea`
  padding: 5px;
  height: 5rem;
  width: 30vw;
  border: none;
  border-radius: 7px;
  box-shadow: 4px 4px 10px 3px lightgrey;
  resize: none;
`;

export const CommentInput = styled(PostInput)`
  height: 2.5rem;
`;

export const EditWrapper = styled.div`
  padding: 5px;
  border: 1px solid #e06849;
  border-radius: 5px;
  width: 31vw;
`;

export const PostWrapper = styled.div``;

// BUTTONS
export const StyledButton = styled.button`
  color: white;
  background-color: #423c45;
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
  background-color: #7d5e5e;
`;

export const PostButton = styled(StyledButton)`
  background-color: #8d93a1;
  padding: 5px 8px;
  width: 100px;
`;

export const EditButton = styled(StyledButton)`
  background-color: #8d93a1;
  padding: 2px 7px;
  margin: 0 2px;
  font-weight: normal;
  font-size: 0.85rem;
`;

export const ToggleButton = styled(StyledButton)`
  background-color: transparent;
  box-shadow: none;
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
  width: 50%;
  min-width: 0;
  max-width: 800px;
  margin-bottom: 1em;
  padding: 1em 5%;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px lightgrey;
`;
