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
import { CommentContext } from "../contexts/CommentContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

const CommentHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentCard = styled(MyCard)`
  width: 80%;
  padding: 5px;
`;

const EditWrapper = styled.div`
  padding: 5px;
  border: 1px solid #7d5e5e;
  border-radius: 5px;
`;

export default function CommentItem({ comment }) {
  const { editComment, deleteComment } = useContext(CommentContext);
  const { currentUser, isAdmin } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [commentToUpdate, setCommentToUpdate] = useState(comment.comment);

  //console.log(comment, commentID, author, authorID, content);

  //Behöver skapa en input för edit att skicka med i funktionen

  function allowUserEditComment() {
    if (isAdmin || currentUser.uid === comment.authorID) {
      return (
        <div>
          <ButtonIconWrapper>
            <EditIcon fontSize="small" onClick={() => setShowEdit(true)} />
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteIcon
              fontSize="small"
              onClick={() => deleteComment(comment)}
            />
          </ButtonIconWrapper>
        </div>
      );
    }
  }

  function renderEditableComment() {
    if (showEdit) {
      return (
        <EditWrapper>
          <PostInput
            value={commentToUpdate}
            onChange={(e) => setCommentToUpdate(e.target.value)}
          />
          <StyledButton onClick={() => setShowEdit(false)}>Avbryt</StyledButton>
          <StyledButton onClick={() => submitEdit()}>Spara</StyledButton>
        </EditWrapper>
      );
    } else {
      return <p>{comment.comment}</p>;
    }
  }

  function submitEdit() {
    console.log(comment, commentToUpdate);
    editComment(comment, commentToUpdate);
    setShowEdit(false);
  }

  return (
    <>
      <CommentCard>
        <CommentHeading>
          <span>
            <b>{comment.author}</b>
          </span>
          {allowUserEditComment()}
        </CommentHeading>
        {renderEditableComment()}
      </CommentCard>
    </>
  );
}
