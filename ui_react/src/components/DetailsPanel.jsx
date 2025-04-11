import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const DetailsPanel = ({ data }) => (
  <TableContainer
    component={Paper}
    sx={{ margin: "auto", mt: 3 }}
  >
    <Table>
      <TableBody>
        {Object.entries(data).map(([key, value], index) => (
          <TableRow key={index}>
            <TableCell sx={{ fontWeight: "bold" }}>{key}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DetailsPanel;
