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
  PostButton,
  PostInput,
} from "../styles/CommonComponents";
import PostItem from "./PostItem";
import styled from "styled-components";

const PendingUserNotice = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: #7d5e5e;
  margin-bottom: 2rem;
`;

export default function PostListView() {
  const { currentUser, currentUserDB, isAdmin, pendingUsers } = useContext(
    AuthContext
  );
  const { posts, getPosts, addPost } = useContext(PostContext);

  const postRef = useRef();

  function handleAddPost() {
    const author = currentUserDB.fullName;
    const authorID = currentUser.uid;
    const post = postRef.current.value;

    addPost(author, authorID, post);
    postRef.current.value = "";
  }

  function renderPendingUsersNotification() {
    console.log("finns ansökningar?");
    if (isAdmin && pendingUsers.length > 0) {
      console.log("Ansökningar finns");
      return (
        <PendingUserNotice>
          Hej Admin! Du har ansökningar som väntar på godkännande.
        </PendingUserNotice>
      );
    }
  }

  useEffect(() => {
    getPosts();
  }, [pendingUsers]);

  return (
    <>
      {renderPendingUsersNotification()}
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
          posts.map((post, index) => {
            return <PostItem key={index} post={post} />;
          })}
      </PostContainer>
    </>
  );
}
