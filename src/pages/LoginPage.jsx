import React from "react";
import LoginForm from "../components/LoginForm";
import { StyledButton } from "../styles/CommonComponents";
import FormLayout from "../styles/FormLayout";

export default function LoginPage() {
  return (
    <>
      <FormLayout>
        {/* <StyledButton style={{ position: "absolute", zIndex: "2" }}>
          Admin inloggning
        </StyledButton> */}
        <br></br>
        <br></br>
        <LoginForm />
      </FormLayout>
    </>
  );
}
