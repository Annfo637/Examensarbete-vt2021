import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";

const FormContainer = styled.div`
  margin-top: -100px;
  display: flex;
  justify-content: center;
  //padding-top: 1rem;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

export default function FormLayout({ children }) {
  return (
    <>
      <Header />
      <FormContainer>
        <FormWrapper>{children}</FormWrapper>
      </FormContainer>
    </>
  );
}
