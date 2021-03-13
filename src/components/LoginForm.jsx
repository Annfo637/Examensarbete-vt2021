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

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loginUser, adminUsers } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  console.log(adminUsers);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError("");
      // disables button from more than one click while login is loading
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Logga in här</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>E-post</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <StyledButton formButton disabled={loading} type="submit">
              Logga in
            </StyledButton>
          </Form>
          {/* <div className="w-100 text-center mt-2">
            Glömt lösenordet? <Link to="/forgot-password">Klicka här</Link>
          </div> */}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Har du inget konto? <Link to="/register">Registrera ett här</Link>
      </div>
    </>
  );
}
