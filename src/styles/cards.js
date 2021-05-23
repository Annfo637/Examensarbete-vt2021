import styled from "styled-components";

export const MyCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: width 0.7s ease;
  width: 90%;
  @media (min-width: 600px) {
    width: 70%;
  }
  @media (min-width: 1000px) {
    width: 55%;
  }
  min-width: 0;
  max-width: 800px;
  margin-bottom: 1em;
  padding: 1em 5%;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px lightgrey;
`;
