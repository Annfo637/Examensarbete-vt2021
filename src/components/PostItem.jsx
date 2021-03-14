import React, { useContext } from "react";
import styled from "styled-components";
import { Card, Button, Alert } from "react-bootstrap";
import {
  StyledLabel,
  StyledInput,
  StyledButton,
  ButtonIconWrapper,
} from "../styles/CommonComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { PostContext } from "../contexts/PostContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import CommentList from "./CommentList";
import CommentContextProvider from "../contexts/CommentContextProvider";

export default function PostItem({
  post,
  postID,
  timestamp,
  author,
  authorID,
  content,
}) {
  const { posts, editPost, deletePost } = useContext(PostContext);
  const { currentUser, isAdmin } = useContext(AuthContext);

  //Behöver skapa en input för edit att skicka med i funktionen

  function allowUserEditPost() {
    if (isAdmin || currentUser.uid === authorID) {
      return (
        <>
          <ButtonIconWrapper>
            <EditIcon fontSize="small" onClick={() => editPost(post)} />
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteIcon fontSize="small" onClick={() => deletePost(post)} />
          </ButtonIconWrapper>
        </>
      );
    }
  }

  return (
    <CommentContextProvider>
      <Card className="mb-2" style={{ width: "80%", maxWidth: "800px" }}>
        <Card.Body>
          <i>{timestamp}</i>
          {allowUserEditPost()}
          <h5>{author}</h5>
          <p>{content}</p>
          <CommentList post={post} />
        </Card.Body>
      </Card>
    </CommentContextProvider>
  );
}
