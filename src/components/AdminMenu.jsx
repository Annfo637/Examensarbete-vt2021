import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import { UserContainer, ContainerItem } from "../styles/PageLayout";
import { StyledButton } from "../styles/CommonComponents";
import { Alert } from "react-bootstrap";

export default function AdminMenu() {
  const { currentUser, currentUserDB, logoutUser } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logoutUser();
      history.push("/login");
    } catch {
      setError("Kunde inte logga ut.");
    }
  }

  return (
    <>
      <UserContainer>
        {/*  <ContainerItem>
          <StyledButton>Ansökningar</StyledButton>
        </ContainerItem>
        <ContainerItem>
          <StyledButton>Godkända medlemmar</StyledButton>
        </ContainerItem> */}
        {/* <ContainerItem>
          <strong>Inloggad som admin:</strong> {currentUser.email}
        </ContainerItem>
        <ContainerItem>
          <Link to={`/user/${currentUser.uid}`}>
            <StyledButton>Min sida</StyledButton>
          </Link>
        </ContainerItem> */}
        <ContainerItem>
          <StyledButton onClick={handleLogout}>Logga ut</StyledButton>
        </ContainerItem>
        {error && <Alert variant="danger">{error}</Alert>}
      </UserContainer>
    </>
  );
}
