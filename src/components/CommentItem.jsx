import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  EditButton,
  ButtonIconWrapper,
  MyCard,
  CommentInput,
  EditWrapper,
} from "../styles/CommonComponents";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { CommentContext } from "../contexts/CommentContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

const CommentHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentHeadingItem = styled.span`
  margin-right: 5px;
  font-weight: ${(props) => (props.author ? "bold" : "")};
  font-style: ${(props) => (props.timestamp ? "italic" : "")};
`;

const CommentCard = styled(MyCard)`
  width: 100%;
  padding: 5px;
  border: none;
  box-shadow: none;
  border-radius: 0;
  border-top: 1px solid lightgrey;
`;

export default function CommentItem({ comment }) {
  const { editComment, deleteComment } = useContext(CommentContext);
  const { currentUser, isAdmin } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [commentToUpdate, setCommentToUpdate] = useState(comment.comment);

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
          <CommentInput
            value={commentToUpdate}
            onChange={(e) => setCommentToUpdate(e.target.value)}
          />
          <div>
            <EditButton onClick={() => setShowEdit(false)}>Avbryt</EditButton>
            <EditButton onClick={() => submitEdit()}>Spara</EditButton>
          </div>
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
            <CommentHeadingItem author>{comment.author}</CommentHeadingItem>
            <CommentHeadingItem timestamp>
              {comment.createdAt}
            </CommentHeadingItem>
          </span>
          {allowUserEditComment()}
        </CommentHeading>
        {renderEditableComment()}
      </CommentCard>
    </>
  );
}
