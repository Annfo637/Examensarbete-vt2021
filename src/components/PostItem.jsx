import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  StyledLabel,
  StyledInput,
  StyledButton,
  ButtonIconWrapper,
  MyCard,
  PostInput,
} from "../styles/CommonComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { PostContext } from "../contexts/PostContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import CommentList from "./CommentList";
import CommentContextProvider from "../contexts/CommentContextProvider";

const EditWrapper = styled.div`
  padding: 5px;
  border: 1px solid #7d5e5e;
  border-radius: 5px;
`;

export default function PostItem({ post }) {
  const { editPost, deletePost } = useContext(PostContext);
  const { currentUser, isAdmin } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(post.post);

  function allowUserEditPost() {
    if (isAdmin || currentUser.uid === post.authorID) {
      return (
        <>
          <ButtonIconWrapper>
            <EditIcon fontSize="small" onClick={() => setShowEdit(true)} />
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteIcon fontSize="small" onClick={() => deletePost(post)} />
          </ButtonIconWrapper>
        </>
      );
    }
  }

  function renderEditablePost() {
    if (showEdit) {
      return (
        <EditWrapper>
          <PostInput
            value={postToUpdate}
            onChange={(e) => setPostToUpdate(e.target.value)}
          />
          <StyledButton onClick={() => setShowEdit(false)}>Avbryt</StyledButton>
          <StyledButton onClick={() => submitEdit()}>Spara</StyledButton>
        </EditWrapper>
      );
    } else {
      return <p>{post.post}</p>;
    }
  }

  function submitEdit() {
    console.log(post, postToUpdate);
    editPost(post, postToUpdate);
    setShowEdit(false);
  }

  return (
    <CommentContextProvider>
      <MyCard>
        <div>
          <i>{post.createdAt}</i>
          {allowUserEditPost()}
        </div>
        <h5>{post.author}</h5>
        {renderEditablePost()}
        <CommentList post={post} />
      </MyCard>
    </CommentContextProvider>
  );
}
