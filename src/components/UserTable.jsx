import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";

export default function UserTable({ users, type }) {
  const { approveUser, makeAdminUser, removeAdminUser } = useContext(
    AuthContext
  );

  function renderUserButtons(user) {
    if (type === "pending") {
      return (
        <>
          <button onClick={() => approveUser(user)}>Godkänn användare</button>
          <button>Radera</button>
        </>
      );
    }
    if (type === "approved") {
      return (
        <>
          <button onClick={() => makeAdminUser(user)}>
            Ge adminbehörighet
          </button>
          <button>Radera</button>
        </>
      );
    }
    if (type === "admin") {
      return (
        <>
          <button onClick={() => removeAdminUser(user)}>
            Ta bort adminbehörighet
          </button>
          <button>Radera</button>
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
