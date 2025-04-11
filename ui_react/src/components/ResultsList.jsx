import React from "react";
import {
  Typography,
  Grid,
  Box,
} from "@mui/material";
const ResultsList = ({ data, onSelect, selected }) => (
  <Grid style={{ flex: 1, marginRight: "20px"}}>
    {data?.length === 0 ? (
      <Typography variant="subtitle1" component="div">
        No results to display.
      </Typography>
    ) : (
      data?.map((item) => (
        <Box
          onClick={() => onSelect(item)}
          sx={{
            // background: selected === item ? "#f9f8fd" : "white",
            p: "10px",
          }}
        >
          {selected === item && (
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              Selected
            </Typography>
          )}
          <Typography variant="h6" sx={{ color: "#01a4b8" }}>
            {item.name}
          </Typography>
          <Grid>
            <Typography variant="subtitle1" component="div">
              {item.count}
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="subtitle1" component="div">
              {item.snippet}
            </Typography>
          </Grid>
          <hr />
        </Box>
      ))
      // data.map((item) => (
      //   <TableContainer
      //     component={Paper}
      //     sx={{ maxWidth: "100%", margin: "auto", mt: 3 }}
      //   >
      //     {selected === item && (
      //       <Typography
      //         variant="h6"
      //         component="div"
      //         sx={{ fontWeight: "bold", ml: "20px" }}
      //         color="primary"
      //       >
      //         Selected
      //       </Typography>
      //     )}
      //     <Table>
      //       <TableBody>
      //         {Object.entries(item).map(([key, value], index) => (
      //           <TableRow
      //             key={index}
      //             onClick={() => onSelect(item)}
      //             style={{
      //               cursor: "pointer",
      //               padding: "10px",
      //               borderBottom: "1px solid #ccc",
      //             }}
      //           >
      //             <TableCell sx={{ fontWeight: "bold" }}>{key}</TableCell>
      //             <TableCell>{value}</TableCell>
      //           </TableRow>
      //         ))}
      //       </TableBody>
      //     </Table>
      //   </TableContainer>
      // ))
    )}
  </Grid>
);

export default ResultsList;
