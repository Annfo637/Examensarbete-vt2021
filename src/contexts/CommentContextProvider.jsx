import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "./AuthContextProvider";

export const CommentContext = createContext({});

export default function CommentContextProvider({ children }) {
  //const [comments, setComments] = useState(null);
  //const { currentUser } = useContext(AuthContext);

  const dbComments = db.collection("comments");

  //ADD COMMENT
  function addComment(author, authorID, postID, comment) {
    const postDate = new Date().toLocaleString();

    const newComment = {
      author,
      authorID,
      commentID: uuidv4(),
      comment,
      createdAt: postDate,
      postID,
    };
    dbComments
      .doc(newComment.commentID)
      .set(newComment)
      .catch((err) => {
        console.log(err);
      });
  }

  //DELETE COMMENT
  function deleteComment(comment) {
    console.log(comment);
    //const dbPostComments = dbComments.where("postID", "==", comment.postID);

    dbComments
      .doc(comment.commentID)
      .delete()
      .catch((err) => {
        console.error(err);
      });
    console.log("delete");
  }
  //EDIT COMMENT
  function editComment(comment, content) {
    //const dbPostComments = dbComments.where("postID", "==", comment.postID);
    const updatedComment = {
      comment: content,
    };
    //setLoading();
    dbComments
      .doc(comment.commentID)
      .update(updatedComment)
      .catch((err) => {
        console.error(err);
      });
  }

  //GET ALL COMMENTS IN A POST
  //   function getComments(postID) {
  //     const dbPostComments = db
  //       .collection("posts")
  //       .doc(postID)
  //       .collection("comments");
  //     console.log(postID);

  //     dbPostComments.orderBy("createdAt", "desc").onSnapshot((dbSnapshot) => {
  //       const dbItems = [];
  //       dbSnapshot.forEach((doc) => {
  //         dbItems.push(doc.data());
  //       });
  //       console.log(dbItems);
  //       setComments(dbItems);
  //     });
  //   }

  const value = {
    addComment,
    deleteComment,
    editComment,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}
