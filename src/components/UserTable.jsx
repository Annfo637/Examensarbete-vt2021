import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthContextProvider";
import { ButtonIconWrapper } from "../styles/wrappers";
import { StyledButton, DeleteButton } from "../styles/buttons";
import {
  MyTable,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderItem,
  TableRow,
} from "../styles/tables";

export default function UserTable({ users, type }) {
  const { approveUser, makeAdminUser, removeAdminUser, deleteUser } =
    useContext(AuthContext);

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
            <DeleteButton onClick={() => deleteUser(type, user)}>
              Radera
            </DeleteButton>
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
            <DeleteButton onClick={() => deleteUser(type, user)}>
              Radera
            </DeleteButton>
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
            <DeleteButton onClick={() => deleteUser(type, user)}>
              Radera
            </DeleteButton>
          </ButtonIconWrapper>
        </>
      );
    }
  }

  return (
    <MyTable>
      <TableHeader>
        <TableRow>
          <TableHeaderItem>Namn</TableHeaderItem>
          <TableHeaderItem>E-post</TableHeaderItem>
          <TableHeaderItem>Lösenord</TableHeaderItem>
          <TableHeaderItem>Redigera</TableHeaderItem>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{renderUserButtons(user)}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </MyTable>
  );
}
