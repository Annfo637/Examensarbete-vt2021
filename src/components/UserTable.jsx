import React, { useContext } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";
import {
  StyledButton,
  DeleteButton,
  ButtonIconWrapper,
} from "../styles/CommonComponents";

const ButtonWrapper = styled.div`
  margin-right: 0.5em;
`;

export default function UserTable({ users, type }) {
  const { approveUser, makeAdminUser, removeAdminUser } = useContext(
    AuthContext
  );

  function renderUserButtons(user) {
    if (type === "pending") {
      return (
        <>
          <ButtonIconWrapper>
            <StyledButton onClick={() => approveUser(user)}>
              Godkänn användare
            </StyledButton>
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteButton>Radera</DeleteButton>
          </ButtonIconWrapper>
        </>
      );
    }
    if (type === "approved") {
      return (
        <>
          <ButtonIconWrapper>
            <StyledButton onClick={() => makeAdminUser(user)}>
              Ge adminbehörighet
            </StyledButton>
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteButton>Radera</DeleteButton>
          </ButtonIconWrapper>
        </>
      );
    }
    if (type === "admin") {
      return (
        <>
          <ButtonIconWrapper>
            <StyledButton onClick={() => removeAdminUser(user)}>
              Ta bort adminbehörighet
            </StyledButton>
          </ButtonIconWrapper>
          <ButtonIconWrapper>
            <DeleteButton>Radera</DeleteButton>
          </ButtonIconWrapper>
        </>
      );
    }
  }

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Namn</th>
          <th>E-post</th>
          <th>Lösenord</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{renderUserButtons(user)}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}
