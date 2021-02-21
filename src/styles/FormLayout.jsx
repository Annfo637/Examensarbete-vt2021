import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 4rem;
  //align-items: center;
  min-height: 100vh;
`;

export default function FormLayout({ children }) {
  return (
    <>
      <Header />
      <FormContainer>
        <div style={{ width: "100%", maxWidth: "400px" }}>{children}</div>
      </FormContainer>
    </>
  );
}
