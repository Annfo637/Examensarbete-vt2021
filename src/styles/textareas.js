import styled from "styled-components";

export const PostInput = styled.textarea`
  padding: 5px;
  height: 5rem;
  transition: width 0.7s ease;
  width: 50vw;
  @media (min-width: 600px) {
    width: 40vw;
  }
  @media (min-width: 1000px) {
    width: 30vw;
  }
  border: none;
  border-radius: 7px;
  box-shadow: 4px 4px 10px 3px lightgrey;
  resize: none;
`;

export const CommentInput = styled(PostInput)`
  height: 2.5rem;
`;
