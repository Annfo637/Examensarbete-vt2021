import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: lavender;
`;
const HeaderTitle = styled.h1`
  display: inline-block;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>This is the header and hero image</HeaderTitle>
    </HeaderContainer>
  );
}
