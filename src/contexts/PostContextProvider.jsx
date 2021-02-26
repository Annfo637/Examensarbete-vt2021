import React, { createContext, useState, useEffect, useContext } from "react";
import firebase, { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "./AuthContextProvider";

export const PostContext = createContext({});

export default function PostContextProvider({ children }) {
  const [currentPost, setCurrentPost] = useState();
  const [posts, setPosts] = useState(null);
  const { currentUser, currentUserDB, setCurrentUserDB } = useContext(
    AuthContext
  );

  const dbPosts = db.collection("posts");
  const dbUsers = db.collection("users");

  useEffect(() => {
    currentUser &&
      dbUsers
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          console.log("hej");
          setCurrentUserDB(doc.data());
        });
    console.log(currentUserDB);
  }, []);

  //ADD POST
  function addPost(author, authorID, post) {
    console.log(author, authorID, post);
    //const timestamp = db.FieldValue.serverTimestamp()
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
  //DELETE POST
  function deletePost(post) {
    console.log(post);

    dbPosts
      .doc(post.postID)
      .delete()
      .catch((err) => {
        console.error(err);
      });
    console.log("delete");
  }
  //EDIT POST
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

  //GET ALL POSTS
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

  //GET POSTS FROM SPECIFIC USER
  function getUsersPosts(userID) {}

  const value = {
    posts,
    addPost,
    deletePost,
    getPosts,
    getUsersPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
