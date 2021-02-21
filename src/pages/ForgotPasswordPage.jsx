import React, { useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Card, Button, Alert, Container } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";

export default function ForgotPasswordPage() {
  const emailRef = useRef();
  const { resetPassword } = useContext(AuthContext);
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
        "Ett mejl har skickats till dig med instruktioner för lösenordsbyte"
      );
    } catch {
      setError("Det gick inte att återställa lösenordet.");
    }
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Återställ ditt lösenord</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleResetPassword}>
                <Form.Group id="email">
                  <Form.Label>E-post</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Återställ lösenord
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
                <Link to="/login">Logga in</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Har du inget konto? <Link to="/register">Registrera ett här</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
