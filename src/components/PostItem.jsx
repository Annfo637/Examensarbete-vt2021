import React, { useState, useContext } from "react";
import {
  EditButton,
  ButtonIconWrapper,
  MyCard,
  PostInput,
  EditWrapper,
  PostWrapper,
} from "../styles/CommonComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { PostContext } from "../contexts/PostContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import CommentList from "./CommentList";
import CommentContextProvider from "../contexts/CommentContextProvider";
import styled from "styled-components";

const PostHeading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PostHeadingItem = styled.span`
  margin-right: 5px;
  font-size: ${(props) => (props.author ? "1.25rem" : "")};
  font-weight: ${(props) => (props.author ? "bold" : "")};
  font-style: ${(props) => (props.timestamp ? "italic" : "")};
`;

export default function PostItem({ post }) {
  const { editPost, deletePost } = useContext(PostContext);
  const { currentUser, isAdmin } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(post.post);

  function allowUserEditPost() {
    if (isAdmin || currentUser.uid === post.authorID) {
      return (
        <div>
          <ButtonIconWrapper>
            <EditIcon fontSize="small" onClick={() => setShowEdit(true)} />
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteIcon fontSize="small" onClick={() => deletePost(post)} />
          </ButtonIconWrapper>
        </div>
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
          <div>
            <EditButton onClick={() => setShowEdit(false)}>Avbryt</EditButton>
            <EditButton onClick={() => submitEdit()}>Spara</EditButton>
          </div>
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
        <PostWrapper>
          <PostHeading>
            <span>
              <PostHeadingItem author>{post.author}</PostHeadingItem>
              <PostHeadingItem timestamp>{post.createdAt}</PostHeadingItem>
            </span>
            {allowUserEditPost()}
          </PostHeading>
          {renderEditablePost()}
        </PostWrapper>
        <CommentList post={post} />
      </MyCard>
    </CommentContextProvider>
  );
}
