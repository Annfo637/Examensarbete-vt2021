import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { StyledButton } from "../styles/CommonComponents";
import { AuthContext } from "../contexts/AuthContextProvider";

const NavContainer = styled.div`
  display: flex;
  margin: 1.5em;
  justify-content: space-between;
  max-height: 100px;
  align-items: center;
  border-bottom: solid 1px lightgray;
  position: sticky;
`;
const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavItem = styled.li`
  display: inline-block;
  margin: 1em 0.3em;
  //margin: ${(props) => (props.vertical ? "0.3em 1em" : "1em 0.3em")};
`;

export default function NavBar() {
  const { currentUser, logoutUser, isAdmin, currentUserDB } = useContext(
    AuthContext
  );
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

  function renderAdminMenu() {
    console.log(currentUserDB);
    return (
      <NavList>
        <NavItem>
          <Link to={"/admin"}>
            <StyledButton>Adminsida</StyledButton>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={"/"}>
            <StyledButton>Hemsida</StyledButton>
          </Link>
        </NavItem>
        {currentUser && (
          <NavItem>
            <Link to={`/user/${currentUser.uid}`}>
              <StyledButton>Min sida</StyledButton>
            </Link>
          </NavItem>
        )}
        <NavItem>
          <StyledButton onClick={handleLogout}>Logga ut</StyledButton>
        </NavItem>
        {error && <Alert variant="danger">{error}</Alert>}
      </NavList>
    );
  }

  function renderUserMenu() {
    console.log(currentUserDB);
    return (
      <NavList>
        <NavItem>
          <Link to={"/"}>
            <StyledButton>Hemsida</StyledButton>
          </Link>
        </NavItem>
        {currentUser && (
          <NavItem>
            <Link to={`/user/${currentUser.uid}`}>
              <StyledButton>Min sida</StyledButton>
            </Link>
          </NavItem>
        )}
        <NavItem>
          <StyledButton onClick={handleLogout}>Logga ut</StyledButton>
        </NavItem>
        {error && <Alert variant="danger">{error}</Alert>}
      </NavList>
    );
  }

  return (
    <NavContainer>
      {currentUser && currentUserDB && (
        <span>
          <strong>Inloggad som: </strong>
          <span>
            {currentUser.email}, {currentUserDB.fullName}
          </span>
        </span>
      )}
      {isAdmin ? renderAdminMenu() : renderUserMenu()}
    </NavContainer>
  );
}
