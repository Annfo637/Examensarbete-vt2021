import React from "react";
import PostListView from "../components/PostListView";
import PostContextProvider from "../contexts/PostContextProvider";
import PageLayout from "../styles/PageLayout";

export default function HomePage() {
  return (
    <PostContextProvider>
      <PageLayout>
        <PostListView />
      </PageLayout>
    </PostContextProvider>
  );
}
