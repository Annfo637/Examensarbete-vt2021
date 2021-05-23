import React, { useState, useContext, useEffect, useRef } from "react";
import { db } from "../firebase";
import { AuthContext } from "../contexts/AuthContextProvider";
import { CommentContext } from "../contexts/CommentContextProvider";
import {
  ContainerItem,
  MakePostContainer,
  PostContainer,
} from "../styles/layouts/PageLayout";
import { PostButton, ToggleButton } from "../styles/buttons";
import { CommentInput } from "../styles/textareas";
import CommentItem from "./CommentItem";

export default function CommentList({ post }) {
  const { currentUser, currentUserDB } = useContext(AuthContext);
  const { addComment } = useContext(CommentContext);
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(true);

  const postID = post.postID;
  const dbComments = db.collection("comments");
  const commentRef = useRef();

  //GET ALL COMMENTS IN A POST
  function getComments() {
    dbComments
      .where("postID", "==", postID)
      .orderBy("createdAt", "desc")
      .onSnapshot((dbSnapshot) => {
        const dbItems = [];

        dbSnapshot.forEach((doc) => {
          dbItems.push(doc.data());
        });
        //console.log("getComments ", dbItems);
        setCommentList(dbItems);
      });
  }

  function handleAddComment() {
    const commentAuthor = currentUserDB.fullName;
    const commentAuthorID = currentUser.uid;
    const comment = commentRef.current.value;

    //console.log(commentAuthor, commentAuthorID, postID, comment);

    addComment(commentAuthor, commentAuthorID, postID, comment);
    commentRef.current.value = "";
  }

  function toggleComments() {
    setShowComments(!showComments);
  }

  function renderComments() {
    return (
      <>
        {commentList &&
          commentList
            .filter((comment) => {
              return postID === comment.postID;
            })
            .map((comment, index) => {
              return <CommentItem key={index} comment={comment} />;
            })}
      </>
    );
  }

  useEffect(() => {
    getComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <MakePostContainer>
        <ContainerItem>
          <CommentInput
            ref={commentRef}
            placeholder="Lägg till en kommentar..."
          />
        </ContainerItem>
        <ContainerItem>
          <PostButton onClick={handleAddComment}>Lägg till</PostButton>
        </ContainerItem>
      </MakePostContainer>
      <ToggleButton onClick={toggleComments}>
        Visa/dölj kommentarer ({commentList.length})
      </ToggleButton>
      <PostContainer>{showComments && renderComments()}</PostContainer>
    </>
  );
}
