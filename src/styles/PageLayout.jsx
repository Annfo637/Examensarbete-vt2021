import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const PageContainer = styled.div`
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
  flex-direction: column;
  justify-content: center;
  max-height: 100px;
  align-items: center;
`;

export const PostContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerItem = styled.div`
  display: inline-block;
  //margin: 1em 0.3em;
  margin: ${(props) => (props.vertical ? "0.3em 1em" : "1em 0.3em")};
`;

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      <PageContainer>{children}</PageContainer>
    </>
  );
}