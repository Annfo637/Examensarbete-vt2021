import React, { useContext, useState, useEffect, useRef } from "react";

import { Card, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";
import { PostContext } from "../contexts/PostContextProvider";
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
import PostItem from "./PostItem";
import UserMenu from "./UserMenu";

export default function PostListView() {
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
  }, []);

  return (
    <>
      <UserMenu />
      <MakePostContainer>
        <ContainerItem vertical>
          <PostContent ref={postRef} placeholder="Skriv ditt inlägg här..." />
        </ContainerItem>
        <ContainerItem vertical>
          <PostButton onClick={handleAddPost}>Posta inlägg</PostButton>
        </ContainerItem>
      </MakePostContainer>
      <PostContainer>
        {posts &&
          posts.map((post, index) => {
            return (
              <PostItem
                key={index}
                post={post}
                timestamp={post.createdAt}
                author={post.author}
                content={post.post}
              />
            );
          })}
      </PostContainer>
    </>
  );
}
