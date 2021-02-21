import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";

export const PostContext = createContext({});

export default function PostContextProvider({ children }) {
  const [currentPost, setCurrentPost] = useState();
  const [posts, setPosts] = useState(null);

  function addPost(author, post) {}

  //   function getPosts() {
  //     db.collection("posts").onSnapshot((dbSnapshot) => {
  //       const dbItems = [];
  //       dbSnapshot.forEach((doc) => {
  //         dbItems.push(doc.data);
  //       });
  //       setPosts(dbItems);
  //       console.log(dbItems);
  //     });
  //   }

  function getUsersPosts(userID) {}

  //   useEffect(() => {
  //     getPosts();
  //     console.log(posts);
  //   }, []);

  const value = {
    currentPost,
    posts,
    addPost,

    getUsersPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
