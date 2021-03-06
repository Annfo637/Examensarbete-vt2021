import React from "react";
import UserPostList from "../components/UserPostList";
import PostContextProvider from "../contexts/PostContextProvider";
import PageLayout from "../styles/layouts/PageLayout";

export default function UserPage() {
  return (
    <PostContextProvider>
      <PageLayout>
        <UserPostList />
      </PageLayout>
    </PostContextProvider>
  );
}
