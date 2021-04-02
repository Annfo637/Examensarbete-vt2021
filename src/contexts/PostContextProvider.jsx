import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "./AuthContextProvider";

export const PostContext = createContext({});

export default function PostContextProvider({ children }) {
  const [posts, setPosts] = useState(null);
  const { currentUser, currentUserDB, setCurrentUserDB, isAdmin } = useContext(
    AuthContext
  );

  const dbPosts = db.collection("posts");
  const dbComments = db.collection("comments");
  console.log(dbPosts);
  const dbUsers = db.collection("users");
  const dbAdmin = db.collection("adminUsers");

  useEffect(() => {
    currentUser && checkTypeOfUser();
  }, []);

  function checkTypeOfUser() {
    if (isAdmin) {
      dbAdmin
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          console.log("hej admin");
          setCurrentUserDB(doc.data());
        });
      console.log(currentUserDB);
    } else {
      dbUsers
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          console.log("hej");
          setCurrentUserDB(doc.data());
        });
      console.log(currentUserDB);
    }
  }

  // CRUD functions for posts
  function addPost(author, authorID, post) {
    const postDate = new Date().toLocaleDateString();

    const newPost = {
      author,
      authorID,
      postID: uuidv4(),
      post,
      createdAt: postDate,
    };
    dbPosts
      .doc(newPost.postID)
      .set(newPost)
      .catch((err) => {
        console.log(err);
      });
  }

  function deletePost(post) {
    console.log(post);
    //delete the post
    dbPosts
      .doc(post.postID)
      .delete()
      .catch((err) => {
        console.error(err);
      });
    console.log("delete");
    //delete all comments on post

    dbComments.where("postID", "==", post.postID).onSnapshot((dbSnapshot) => {
      console.log(dbSnapshot);
      dbSnapshot.forEach((doc) => {
        dbComments
          .doc(doc.data().commentID)
          .delete()
          .catch((err) => {
            console.error(err);
          });
        console.log("delete comments");
      });
    });
  }

  function editPost(post, content) {
    const updatedPost = {
      post: content,
    };
    //setLoading();
    dbPosts
      .doc(post.postID)
      .update(updatedPost)
      .catch((err) => {
        console.error(err);
      });
  }

  function getPosts() {
    dbPosts.orderBy("createdAt", "desc").onSnapshot((dbSnapshot) => {
      const dbItems = [];
      dbSnapshot.forEach((doc) => {
        dbItems.push(doc.data());
      });
      console.log(dbItems);
      setPosts(dbItems);
    });
  }

  function getUsersPosts(userID) {}

  const value = {
    posts,
    addPost,
    deletePost,
    editPost,
    getPosts,
    getUsersPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
