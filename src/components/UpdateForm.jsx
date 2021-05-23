import React, { useRef, useContext, useState } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";
import {
  StyledForm,
  FormHeading,
  FormItem,
  FormLabel,
  FormInput,
} from "../styles/forms";
import { StyledButton } from "../styles/buttons";
import CheckIcon from "@material-ui/icons/Check";

export default function UpdateProfilePage() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUserDB, updatePassword, isAdmin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const dbUsers = db.collection("users");
  const dbAdmin = db.collection("adminUsers");
  const id = currentUserDB.userID;

  function handleUpdateProfile(e) {
    e.preventDefault();

    let userName = currentUserDB.fullName;
    let userPassword = currentUserDB.password;
    setError("");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Lösenorden matchar inte varandra.");
    }
    if (nameRef.current.value !== currentUserDB.fullName) {
      userName = nameRef.current.value;
    }
    if (
      passwordRef.current.value !== currentUserDB.password &&
      passwordRef.current.value.length > 0
    ) {
      userPassword = passwordRef.current.value;
      updatePassword(passwordRef.current.value);
    }

    const updatedUser = {
      fullName: userName,
      password: userPassword,
    };
    if (isAdmin) {
      dbAdmin
        .doc(id)
        .update(updatedUser)
        .catch((err) => {
          setError(err);
        });
    } else {
      dbUsers
        .doc(id)
        .update(updatedUser)
        .catch((err) => {
          setError(err);
        });
    }
    if (!error) {
      setSuccess(true);
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleUpdateProfile}>
        <FormHeading>Uppdatera din profil</FormHeading>
        {error && <Alert variant="danger">{error}</Alert>}

        <FormItem id="name">
          <FormLabel>För- och efternamn</FormLabel>
          <FormInput
            type="text"
            ref={nameRef}
            required
            defaultValue={currentUserDB.fullName}
          />
        </FormItem>
        <FormItem id="password">
          <FormLabel>Lösenord</FormLabel>
          <FormInput
            type="password"
            ref={passwordRef}
            placeholder="Lämna tomt för att behålla samma lösenord"
          />
        </FormItem>
        <FormItem id="password-confirm">
          <FormLabel>Bekräfta Lösenord</FormLabel>
          <FormInput
            type="password"
            ref={passwordConfirmRef}
            placeholder="Lämna tomt för att behålla samma lösenord"
          />
        </FormItem>
        <StyledButton type="submit">Spara</StyledButton>
      </StyledForm>

      <div className="w-100 text-center mt-2">
        {success && (
          <Alert variant="success">
            Dina uppgifter har sparats!
            <CheckIcon style={{ color: "#49b588" }} />
          </Alert>
        )}
        <StyledButton onClick={() => history.push("/")}>
          Tillbaka till hemsidan
        </StyledButton>
      </div>
    </>
  );
}
