import React, { useState, useContext } from "react";
import styled from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { colors } from "../styles/colors";
import { AuthContext } from "../contexts/AuthContextProvider";
import SettingsIcon from "@material-ui/icons/Settings";
import { MyTooltip, TooltipText } from "../styles/tooltips";

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  justify-content: center;
  max-height: 100px;
  align-items: center;
  border-bottom: solid 1px lightgray;
  position: sticky;
  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    margin: 1.5rem;
  }
`;
const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;
const NavItem = styled.li`
  display: inline-block;
  margin: 1em 0.3em;
`;

const UserInfo = styled.span`
  margin-right: 10px;
`;

const StyledNavLink = styled(NavLink)`
  color: ${colors.textLight};
  padding: 7px 10px;
  border: transparent;
  border-radius: 7px;
  box-shadow: 3px 3px 10px 1px grey;
  font-family: "Source Sans Pro";
  font-size: 1rem;
  font-weight: 500;
  width: auto;
  background-color: ${colors.themeDark};
  &.${(props) => props.activeClassName} {
    background-color: ${colors.themeLight};
  }
  &:hover {
    color: ${colors.textLight};
    text-decoration: none;
    background-color: ${colors.themeLight};
  }
`;

const StyledNavButton = styled.button`
  color: ${colors.textLight};
  padding: 7px 10px;
  border: transparent;
  border-radius: 7px;
  box-shadow: 3px 3px 10px 1px grey;
  font-family: "Source Sans Pro";
  font-size: 1rem;
  font-weight: 500;
  width: auto;
  background-color: ${colors.themeDark};
  &.${(props) => props.activeClassName} {
    background-color: ${colors.themeLight};
  }
  &:hover {
    color: ${colors.textLight};
    text-decoration: none;
    background-color: ${colors.themeLight};
  }
`;

const SettingsLink = styled(Link)`
  color: ${colors.textDark};
  &:hover {
    color: ${colors.themeLight};
  }
`;

export default function NavBar() {
  const { currentUser, logoutUser, isAdmin, currentUserDB } =
    useContext(AuthContext);
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

  function renderMenu() {
    return (
      <NavList>
        {isAdmin && (
          <NavItem>
            <StyledNavLink activeClassName="active" to={"/admin"}>
              Adminsida
            </StyledNavLink>
          </NavItem>
        )}
        <NavItem>
          <StyledNavLink activeClassName="active" exact to={"/"}>
            Hemsida
          </StyledNavLink>
        </NavItem>
        {currentUser && (
          <NavItem>
            <StyledNavLink
              activeClassName="active"
              to={`/user/${currentUser.uid}`}
            >
              Min sida
            </StyledNavLink>
          </NavItem>
        )}
        <NavItem>
          <StyledNavButton onClick={handleLogout}>Logga ut</StyledNavButton>
        </NavItem>
        {error && <Alert variant="danger">{error}</Alert>}
      </NavList>
    );
  }

  return (
    <NavContainer>
      {currentUser && currentUserDB && (
        <div>
          <UserInfo>
            <strong>Inloggad som: </strong>
            {currentUser.email}, {currentUserDB.fullName}
          </UserInfo>
          <MyTooltip>
            <SettingsLink to="/update-profile">
              <SettingsIcon />
            </SettingsLink>
            <TooltipText>Mina kontoinställningar</TooltipText>
          </MyTooltip>
        </div>
      )}
      {renderMenu()}
    </NavContainer>
  );
}
