import React, { useRef, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";
import { StyledButton } from "../styles/CommonComponents";
import {
  StyledForm,
  FormHeading,
  FormItem,
  FormLabel,
  FormInput,
} from "../styles/forms";

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError("");
      // Loading disables button from more than one click while login is loading
      setLoading(true);
      await loginUser(
        emailRef.current.value,
        passwordRef.current.value,
        history
      );
      setLoading(false);
      history.push("/");
    } catch {
      setError("Det gick inte att logga in.");
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleLogin}>
        <FormHeading>Logga in här</FormHeading>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormItem id="email">
          <FormLabel>E-post</FormLabel>
          <FormInput type="email" ref={emailRef} required></FormInput>
        </FormItem>
        <FormItem id="password">
          <FormLabel>Lösenord</FormLabel>
          <FormInput type="password" ref={passwordRef} required></FormInput>
        </FormItem>
        <StyledButton formButton disabled={loading} type="submit">
          Logga in
        </StyledButton>
      </StyledForm>
      {/* <div className="w-100 text-center mt-2">
            Glömt lösenordet? <Link to="/forgot-password">Klicka här</Link>
          </div> */}

      <div className="w-100 text-center mt-2">
        Har du inget konto? <Link to="/register">Registrera ett här</Link>
      </div>
    </>
  );
}
