import React from "react";
import AdminMenu from "../components/AdminMenu";
import AdminTabs from "../components/AdminTabs";
import PageLayout from "../styles/PageLayout";
import Header from "../components/Header";

export default function AdminPage() {
  return (
    <div>
      <PageLayout>
        <AdminMenu />
        <AdminTabs />
      </PageLayout>
    </div>
  );
}
