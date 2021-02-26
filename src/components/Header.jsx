import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  position: relative;
  height: 250px;
  width: 100vw;
  background: linear-gradient(to bottom, transparent, whitesmoke 95%);
`;
const HeaderImage = styled.img`
  width: 100%;
  height: 375px;
  object-fit: cover;
  position: absolute;
  margin-top: -125px;
  z-index: -1;
`;
const HeaderTitle = styled.h1`
  font-family: "Shadows Into Light";
  font-size: 4rem;
  margin-top: 3%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

export default function Header() {
  return (
    <HeaderContainer>
      //
      <HeaderImage src="../../images/colorhouses.jpg" alt="apartment houses" />
      {/* <HeaderImage
        src="../../images/squarewithsky.jpg"
        alt="apartment houses"
      /> */}
      <HeaderTitle>Grannar tillsammans</HeaderTitle>
    </HeaderContainer>
  );
}
