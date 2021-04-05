import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import styled from "styled-components";
import { Tabs, Tab, Content } from "../styles/tabs";
import UserTable from "./UserTable";

const AdminPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 2em;
  align-items: center;
  min-height: 100vh;
`;

export default function AdminTabs() {
  //active är id på den aktiva fliken
  const [active, setActive] = useState(0);
  const {
    pendingUsers,
    getPendingUsers,
    approvedUsers,
    getApprovedUsers,
    adminUsers,
    getAdminUsers,
  } = useContext(AuthContext);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  useEffect(() => {
    getPendingUsers();
    getApprovedUsers();
    getAdminUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AdminPageContainer>
      <h1>Välkommen admin</h1>

      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Ansökningar
        </Tab>

        <Tab onClick={handleClick} active={active === 1} id={1}>
          Godkända användare
        </Tab>

        <Tab onClick={handleClick} active={active === 2} id={2}>
          Administratörer
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <UserTable users={pendingUsers} type="pending" />
        </Content>
        <Content active={active === 1}>
          <UserTable users={approvedUsers} type="approved" />
        </Content>
        <Content active={active === 2}>
          <UserTable users={adminUsers} type="admin" />
        </Content>
      </>
    </AdminPageContainer>
  );
}
