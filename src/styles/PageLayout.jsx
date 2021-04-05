import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const PageContainer = styled.div`
  //<main>?
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  //align-items: center;
  min-height: 100vh;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-height: 100px;
  align-items: center;
`;

export const MakePostContainer = styled.div`
  display: flex;
  justify-content: center;
  max-height: 100px;
  align-items: center;
`;

export const PostContainer = styled.div`
  // article?
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerItem = styled.div`
  display: inline-block;
  margin: ${(props) => (props.vertical ? "0.3em 1em" : "1em 0.3em")};
`;

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      <NavBar />
      <PageContainer>{children}</PageContainer>
    </>
  );
}
