import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { PostContext } from "../contexts/PostContextProvider";
import {
  ContainerItem,
  MakePostContainer,
  PostContainer,
} from "../styles/PageLayout";
import { PostButton, PostInput } from "../styles/CommonComponents";
import PostItem from "./PostItem";

export default function UserPostList() {
  const { currentUser, currentUserDB } = useContext(AuthContext);
  const { posts, getPosts, addPost } = useContext(PostContext);

  const postRef = useRef();

  function handleAddPost() {
    const author = currentUserDB.fullName;
    const authorID = currentUser.uid;
    const post = postRef.current.value;

    addPost(author, authorID, post);
    postRef.current.value = "";
  }

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <MakePostContainer>
        <ContainerItem>
          <PostInput ref={postRef} placeholder="Skriv ditt inlägg här..." />
        </ContainerItem>
        <ContainerItem>
          <PostButton onClick={handleAddPost}>Posta inlägg</PostButton>
        </ContainerItem>
      </MakePostContainer>
      <PostContainer>
        {posts &&
          posts
            .filter((post) => {
              return post.authorID === currentUser.uid;
            })
            .map((post, index) => {
              return <PostItem key={index} post={post} />;
            })}
      </PostContainer>
    </>
  );
}
