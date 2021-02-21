import React, { useRef, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Card, Button, Alert, Container } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContextProvider";

export default function UpdateProfilePage() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateName, updatePassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleUpdateProfile(e) {
    e.preventDefault();

    // Check that user has written matching passwords
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Lösenorden matchar inte varandra.");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (nameRef.current.value !== currentUser.displayName) {
      console.log("hej");
      const changedName = updateName(nameRef.current.value);
      console.log(changedName); //promise pending
      promises.push(changedName);
    }
    if (passwordRef.current.value !== currentUser.password) {
      const changedPassword = updatePassword(passwordRef.current.value);
      console.log(changedPassword);
      promises.push(changedPassword);
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Det gick inte att uppdatera kontot.");
      })
      .finally(() => {
        setLoading(false);
      });
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
              <h2 className="text-center mb-4">Uppdatera din profil</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group id="name">
                  <Form.Label>För- och efternamn</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    required
                    defaultValue={currentUser.displayName}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>E-post</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    disabled
                    defaultValue={currentUser.email}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Lämna tomt för att behålla samma lösenord"
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Bekräfta Lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Lämna tomt för att behålla samma lösenord"
                  ></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Spara
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/">Avbryt</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
