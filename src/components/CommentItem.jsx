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
import { CommentContext } from "../contexts/CommentContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

export default function CommentItem({
  comment,
  commentID,
  author,
  authorID,
  content,
}) {
  const { editComment, deleteComment } = useContext(CommentContext);
  const { currentUser, isAdmin } = useContext(AuthContext);

  console.log(comment, commentID, author, authorID, content);

  //Behöver skapa en input för edit att skicka med i funktionen

  function allowUserEditComment() {
    if (isAdmin || currentUser.uid === authorID) {
      return (
        <>
          <ButtonIconWrapper>
            <EditIcon fontSize="small" onClick={() => editComment(comment)} />
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteIcon
              fontSize="small"
              onClick={() => deleteComment(comment)}
            />
          </ButtonIconWrapper>
        </>
      );
    }
  }

  return (
    <>
      <Card className="mb-2" style={{ width: "50%", maxWidth: "800px" }}>
        <Card.Body>
          {allowUserEditComment()}
          <h5>{author}</h5>
          <p>{content}</p>
        </Card.Body>
      </Card>
    </>
  );
}
