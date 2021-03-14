import React, { useContext, useEffect, useRef } from "react";

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
      <MakePostContainer>
        <ContainerItem>
          <PostContent ref={postRef} placeholder="Skriv ditt inlägg här..." />
        </ContainerItem>
        <ContainerItem>
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
                postID={post.postID}
                timestamp={post.createdAt}
                author={post.author}
                authorID={post.authorID}
                content={post.post}
              />
            );
          })}
      </PostContainer>
    </>
  );
}
