import React, { useState, useContext } from "react";
import styled from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { StyledButton } from "../styles/CommonComponents";
import { AuthContext } from "../contexts/AuthContextProvider";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import { MyTooltip, TooltipText } from "../styles/tooltips";

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
`;

const UserInfo = styled.span`
  margin-right: 10px;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  padding: 7px 20px;
  border: transparent;
  border-radius: 7px;
  box-shadow: 3px 3px 10px 1px grey;
  font-family: "Source Sans Pro";
  font-size: 1rem;
  font-weight: 500;
  width: auto;
  background-color: #423c45;
  &.${(props) => props.activeClassName} {
    background-color: #8d93a1;
  }
  &:hover {
    color: white;
    text-decoration: none;
    background-color: #8d93a1;
  }
`;

const SettingsLink = styled(Link)`
  color: #2a2e30;
  &:hover {
    color: #8d93a1;
  }
`;

const TooltipMessage = styled.p`
  font-size: 1rem;
  font-family: "Source Sans Pro";
  padding: 0.5rem;
  margin: 0;
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
          <StyledButton onClick={handleLogout}>Logga ut</StyledButton>
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
          {/* <Tooltip
            title={<TooltipMessage>Mina kontoinställningar</TooltipMessage>}
            arrow
            placement="right"
          >
            <SettingsLink to="/update-profile">
              <SettingsIcon />
            </SettingsLink>
          </Tooltip> */}
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
