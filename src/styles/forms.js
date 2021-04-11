import styled from "styled-components";

export const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  margin-bottom: 1em;
  padding: 1em 5%;
  background-color: #fff;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px lightgrey;
`;

export const FormHeading = styled.h2`
  text-align: center;
`;

export const FormItem = styled.div`
  margin-bottom: 1rem;
`;
export const FormLabel = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const FormInput = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: none;
  border-radius: 7px;
  box-shadow: 4px 4px 10px 3px lightgrey;
`;
