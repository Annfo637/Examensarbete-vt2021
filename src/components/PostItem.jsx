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

export default function PostItem({ post, timestamp, author, content }) {
  const { posts, editPost, deletePost } = useContext(PostContext);

  return (
    <>
      <Card className="mb-2" style={{ width: "80%", maxWidth: "800px" }}>
        <Card.Body>
          <i>{timestamp}</i>
          <h5>{author}</h5>
          <p>{content}</p>
          <ButtonIconWrapper>
            <EditIcon fontSize="small" onClick={() => editPost(post)} />
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteIcon fontSize="small" onClick={() => deletePost(post)} />
          </ButtonIconWrapper>
        </Card.Body>
      </Card>
    </>
  );
}
