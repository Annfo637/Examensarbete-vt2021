import React from "react";
import PostList from "../components/PostList";
import PostContextProvider from "../contexts/PostContextProvider";
import PageLayout from "../styles/layouts/PageLayout";

export default function HomePage() {
  return (
    <PostContextProvider>
      <PageLayout>
        <PostList />
      </PageLayout>
    </PostContextProvider>
  );
}
