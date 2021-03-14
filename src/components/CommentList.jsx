import React, { useState, useContext, useEffect, useRef } from "react";
import { db } from "../firebase";

import { AuthContext } from "../contexts/AuthContextProvider";
import { CommentContext } from "../contexts/CommentContextProvider";
import {
  ContainerItem,
  MakePostContainer,
  PostContainer,
} from "../styles/PageLayout";
import {
  StyledLabel,
  StyledInput,
  StyledButton,
  PostContent,
  PostButton,
} from "../styles/CommonComponents";
import CommentItem from "./CommentItem";

export default function CommentList({ post }) {
  const { currentUser, currentUserDB } = useContext(AuthContext);
  const { addComment } = useContext(CommentContext);
  const [commentList, setCommentList] = useState([]);

  const postID = post.postID;
  const dbComments = db.collection("comments");
  const commentRef = useRef();

  //GET ALL COMMENTS IN A POST
  function getComments(postID) {
    const dbPostComments = dbComments.where("postID", "==", postID);

    console.log(postID, dbPostComments);

    dbPostComments.orderBy("createdAt", "desc").onSnapshot((dbSnapshot) => {
      const dbItems = [];

      dbSnapshot.forEach((doc) => {
        console.log("snap ", doc);
        dbItems.push(doc.data());
      });
      console.log("getComments ", dbItems);
      setCommentList(dbItems);
    });
  }

  function handleAddComment() {
    const commentAuthor = currentUserDB.fullName;
    const commentAuthorID = currentUser.uid;
    const comment = commentRef.current.value;

    console.log(commentAuthor, commentAuthorID, postID, comment);

    addComment(commentAuthor, commentAuthorID, postID, comment);
    commentRef.current.value = "";
  }

  useEffect(() => {
    getComments(postID);
  }, []);

  return (
    <>
      <MakePostContainer>
        <ContainerItem>
          <PostContent
            ref={commentRef}
            placeholder="lägg till en kommentar..."
          />
        </ContainerItem>
        <ContainerItem>
          <PostButton onClick={handleAddComment}>+</PostButton>
        </ContainerItem>
      </MakePostContainer>
      <PostContainer>
        {commentList &&
          commentList.map((comment, index) => {
            return (
              <CommentItem
                key={index}
                comment={comment}
                commentID={comment.commentID}
                author={comment.author}
                authorID={comment.authorID}
                content={comment.comment}
              />
            );
          })}
      </PostContainer>
    </>
  );
}
