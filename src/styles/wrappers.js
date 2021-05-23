import styled from "styled-components";

export const EditWrapper = styled.div`
  padding: 5px;
  border: 1px solid #e06849;
  border-radius: 5px;
  transition: width 0.7s ease;
  width: 53vw;
  @media (min-width: 600px) {
    width: 42vw;
  }
  @media (min-width: 1000px) {
    width: 31vw;
  }
`;

export const PostWrapper = styled.div``;

export const ButtonIconWrapper = styled.div`
  display: inline-block;
  margin: 0 3px;
  :hover {
    cursor: pointer;
  }
`;
