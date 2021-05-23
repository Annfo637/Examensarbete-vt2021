import React, { useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { UserContext } from "../contexts/UserContextProvider";
import { StyledButton } from "../styles/buttons";
import {
  StyledForm,
  FormHeading,
  FormItem,
  FormLabel,
  FormInput,
} from "../styles/forms";

export default function RegisterForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { registerUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    // Check that user has written matching and long enough passwords

    if (passwordRef.current.value.length < 6) {
      return setError("Lösenordet måste vara minst 6 tecken långt.");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Lösenorden matchar inte varandra.");
    }

    try {
      setError("");
      // disables button from more than one click while signUp is loading
      setLoading(true);
      await registerUser(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoading(false);
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      passwordConfirmRef.current.value = "";
      //Alert med information visas.
      setConfirmation(
        "Tack för din registrering. Medlemskap godkänns inom 72 timmar, annars kontakta din admin."
      );
    } catch {
      setError("Det gick inte att skapa ett konto.");
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleRegister}>
        <FormHeading>Registrera dig här</FormHeading>
        {error && <Alert variant="danger">{error}</Alert>}
        {confirmation && <Alert variant="success">{confirmation}</Alert>}
        <FormItem controlId="name">
          <FormLabel>För- och efternamn</FormLabel>
          <FormInput type="text" ref={nameRef} required></FormInput>
        </FormItem>
        <FormItem controlId="email">
          <FormLabel>E-post</FormLabel>
          <FormInput type="email" ref={emailRef} required></FormInput>
        </FormItem>
        <FormItem controlId="password">
          <FormLabel>Lösenord</FormLabel>
          <FormInput type="password" ref={passwordRef} required></FormInput>
        </FormItem>
        <FormItem controlId="password-confirm">
          <FormLabel>Bekräfta Lösenord</FormLabel>
          <FormInput
            type="password"
            ref={passwordConfirmRef}
            required
          ></FormInput>
        </FormItem>
        <StyledButton formButton disabled={loading} type="submit">
          Skapa konto
        </StyledButton>
      </StyledForm>
      <div className="w-100 text-center mt-2">
        Har du redan ett konto? <Link to="/login">Logga in</Link>
      </div>
    </>
  );
}
