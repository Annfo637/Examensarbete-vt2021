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
} from "../styles/CommonComponents";

import { db } from "../firebase";
import PostItem from "./PostItem";

export default function PostListView() {
  const { currentUser, logoutUser } = useContext(AuthContext);
  //const { posts, getPosts } = useContext(PostContext);
  const [error, setError] = useState("");
  const history = useHistory();
  const [posts, setPosts] = useState([]);
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

  function getPosts() {
    db.collection("posts").onSnapshot((dbSnapshot) => {
      const dbItems = [];
      dbSnapshot.forEach((doc) => {
        dbItems.push(doc.data());
      });
      console.log(dbItems);
      setPosts(dbItems);
    });
  }

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  return (
    <>
      <UserContainer>
        {error && <Alert variant="danger">{error}</Alert>}
        <ContainerItem>
          <strong>Inloggad som:</strong> {currentUser.email}
        </ContainerItem>
        {/* <Link to="update-profile" className="btn btn-primary w-100 mt-2">
          Uppdatera profil
        </Link> */}
        <ContainerItem>
          <Link to="update-profile" className="btn btn-primary w-100 mt-2">
            Min sida
          </Link>
        </ContainerItem>
        <ContainerItem>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Logga ut
            </Button>
          </div>
        </ContainerItem>
      </UserContainer>
      <MakePostContainer>
        <ContainerItem vertical>
          <textarea ref={postRef} placeholder="Skriv ditt inlägg här..." />
        </ContainerItem>
        <ContainerItem vertical>
          <StyledButton>Posta inlägg</StyledButton>
        </ContainerItem>
      </MakePostContainer>
      <PostContainer>
        {posts &&
          posts.map((post, index) => {
            return (
              <Card
                key={index}
                className="mb-2"
                style={{ width: "80%", maxWidth: "800px" }}
              >
                <Card.Body>
                  <PostItem author={post.author} post={post.post} />
                </Card.Body>
              </Card>
            );
          })}
      </PostContainer>
    </>
  );
}
