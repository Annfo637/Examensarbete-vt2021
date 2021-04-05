import styled from "styled-components";

export const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  //max-width: 800px;
  margin-bottom: 1em;
  padding: 1em 5%;
  background-color: #fff;
  border: 1px solid lightgrey;
  border-radius: 5px;
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
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;
