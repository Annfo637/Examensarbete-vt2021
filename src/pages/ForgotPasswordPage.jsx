import React, { useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { UserContext } from "../contexts/UserContextProvider";
import {
  StyledForm,
  FormHeading,
  FormItem,
  FormLabel,
  FormInput,
} from "../styles/forms";
import FormLayout from "../styles/layouts/FormLayout";
import { StyledButton } from "../styles/buttons";

export default function ForgotPasswordPage() {
  const emailRef = useRef();
  const { resetPassword } = useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleResetPassword(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      // disables button from more than one click while resetPassword is loading
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(
        "Ett mejl har skickats till dig med instruktioner för lösenordsbyte."
      );
    } catch {
      setError("Det gick inte att återställa lösenordet.");
    }
    setLoading(false);
  }

  return (
    <FormLayout>
      <StyledForm onSubmit={handleResetPassword}>
        <FormHeading>Återställ ditt lösenord</FormHeading>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <FormItem id="email">
          <FormLabel>E-post</FormLabel>
          <FormInput type="email" ref={emailRef} required></FormInput>
        </FormItem>
        <StyledButton disabled={loading} type="submit">
          Återställ lösenord
        </StyledButton>
      </StyledForm>
      <div className="w-100 text-center mt-2">
        Tillbaka till <Link to="/login">inloggning</Link>
      </div>
    </FormLayout>
  );
}
