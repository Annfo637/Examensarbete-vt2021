import React from "react";
import AdminTabs from "../components/AdminTabs";
import PageLayout from "../styles/PageLayout";

export default function AdminPage() {
  return (
    <>
      <PageLayout>
        <AdminTabs />
      </PageLayout>
    </>
  );
}
