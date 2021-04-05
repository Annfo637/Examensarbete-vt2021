import styled from "styled-components";

export const MyTable = styled.table`
  border: 1px solid #dee2e6;
  border-spacing: 0;
  width: 100%;
  //margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  width: 100%;
  background-color: #e7e7e7;
  border-bottom: 1px solid #8d93a1;
`;

export const TableHeaderItem = styled.th`
  text-align: center;
  padding: 16px;
  width: auto;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  :nth-child(even) {
    background-color: #e7e7e7;
  }
`;

export const TableCell = styled.td`
  text-align: center;
  padding: 16px;
  width: auto;
`;
