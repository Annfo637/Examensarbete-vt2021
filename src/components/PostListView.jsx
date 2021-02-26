import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";
import { PostContext } from "../contexts/PostContextProvider";
import {
  UserContainer,
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
  const { currentUser, currentUserDB, logoutUser } = useContext(AuthContext);
  const { posts, getPosts, addPost } = useContext(PostContext);
  const [error, setError] = useState("");
  const history = useHistory();
  const postRef = useRef();

  async function handleLogout() {
    setError("");
    try {
      await logoutUser();
      history.push("/login");
    } catch {
      setError("Kunde inte logga ut.");
    }
  }

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
      <UserContainer>
        {error && <Alert variant="danger">{error}</Alert>}
        <ContainerItem>
          <strong>Inloggad som:</strong> {currentUser.email}
        </ContainerItem>
        <ContainerItem>
          <Link to={`/user/${currentUser.uid}`}>
            <StyledButton>Min sida</StyledButton>
          </Link>
        </ContainerItem>
        <ContainerItem>
          <StyledButton onClick={handleLogout}>Logga ut</StyledButton>
        </ContainerItem>
      </UserContainer>
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
