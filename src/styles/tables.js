import styled from "styled-components";
import { colors } from "./colors";

export const MyTable = styled.table`
  border: 1px solid #dee2e6; //kollas
  border-spacing: 0;
  width: 100%;
  color: #212529; //kollas
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  width: 100%;
  background-color: ${colors.tableBackground};
  border-bottom: 1px solid ${colors.themeLight};
`;

export const TableHeaderItem = styled.th`
  text-align: center;
  padding: 16px;
  width: auto;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  :nth-child(even) {
    background-color: ${colors.tableBackground};
  }
`;

export const TableCell = styled.td`
  text-align: center;
  padding: 16px;
  width: auto;
`;
