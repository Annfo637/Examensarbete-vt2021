import React, { useRef, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";
import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
} from "../styles/CommonComponents";

export default function RegisterForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { registerUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
      history.push("/");
    } catch {
      setError("Det gick inte att skapa ett konto.");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Registrera dig här</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="name">
              <Form.Label>För- och efternamn</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>E-post</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password-confirm">
              <Form.Label>Bekräfta Lösenord</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <StyledButton formButton disabled={loading} type="submit">
              Skapa konto
            </StyledButton>
          </Form>
          <div className="w-100 text-center mt-2">
            Har du redan ett konto? <Link to="/login">Logga in</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
