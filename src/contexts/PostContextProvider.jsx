import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "./AuthContextProvider";

export const PostContext = createContext({});

export default function PostContextProvider({ children }) {
  const [posts, setPosts] = useState(null);
  const [usersPosts, setUsersPosts] = useState(null);
  const { currentUser, currentUserDB, setCurrentUserDB, isAdmin } =
    useContext(AuthContext);

  const dbPosts = db.collection("posts");
  const dbComments = db.collection("comments");
  const dbUsers = db.collection("users");
  const dbAdmin = db.collection("adminUsers");

  useEffect(() => {
    currentUser && checkTypeOfUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function checkTypeOfUser() {
    if (isAdmin) {
      dbAdmin
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          setCurrentUserDB(doc.data());
        });
    } else {
      dbUsers
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          setCurrentUserDB(doc.data());
        });
    }
  }

  // CRUD functions for posts
  function addPost(author, authorID, post) {
    // const postDate = new Date().toLocaleDateString();
    const postDate = new Date().toLocaleString();

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
    //first delete the post
    dbPosts
      .doc(post.postID)
      .delete()
      .catch((err) => {
        console.error(err);
      });

    //then delete all comments on post
    dbComments.where("postID", "==", post.postID).onSnapshot((dbSnapshot) => {
      dbSnapshot.forEach((doc) => {
        dbComments
          .doc(doc.data().commentID)
          .delete()
          .catch((err) => {
            console.error(err);
          });
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
      setPosts(dbItems);
    });
  }

  function getUsersPosts() {
    dbPosts
      .where("authorID", "==", currentUser.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((dbSnapshot) => {
        const dbItems = [];
        dbSnapshot.forEach((doc) => {
          dbItems.push(doc.data());
        });
        setUsersPosts(dbItems);
      });
  }

  const value = {
    posts,
    usersPosts,
    addPost,
    deletePost,
    editPost,
    getPosts,
    getUsersPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
