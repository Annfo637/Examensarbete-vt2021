import React, { createContext } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export const CommentContext = createContext({});

export default function CommentContextProvider({ children }) {
  const dbComments = db.collection("comments");

  // CRUD FUNCTIONS FOR COMMENTS
  function addComment(author, authorID, postID, comment) {
    const commentDate = new Date().toLocaleString();

    const newComment = {
      author,
      authorID,
      commentID: uuidv4(),
      comment,
      createdAt: commentDate,
      postID,
    };
    dbComments
      .doc(newComment.commentID)
      .set(newComment)
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteComment(comment) {
    dbComments
      .doc(comment.commentID)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  function editComment(comment, content) {
    const updatedComment = {
      comment: content,
    };

    dbComments
      .doc(comment.commentID)
      .update(updatedComment)
      .catch((err) => {
        console.error(err);
      });
  }

  const value = {
    addComment,
    deleteComment,
    editComment,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}
