import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { PostContext } from "../contexts/PostContextProvider";
import {
  ContainerItem,
  MakePostContainer,
  PostContainer,
} from "../styles/layouts/PageLayout";
import { PostButton } from "../styles/buttons";
import { PostInput } from "../styles/textareas";
import PostItem from "./PostItem";

export default function UserPostList() {
  const { currentUser, currentUserDB } = useContext(AuthContext);
  const { usersPosts, getUsersPosts, addPost } = useContext(PostContext);

  const postRef = useRef();

  function handleAddPost() {
    const author = currentUserDB.fullName;
    const authorID = currentUser.uid;
    const post = postRef.current.value;

    addPost(author, authorID, post);
    postRef.current.value = "";
  }

  useEffect(() => {
    getUsersPosts();
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
        {usersPosts &&
          usersPosts
            // .filter((post) => {
            //   return post.authorID === currentUser.uid;
            // })
            .map((post, index) => {
              return <PostItem key={index} post={post} />;
            })}
      </PostContainer>
    </>
  );
}
