import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SortDropdown = ({ data, options, setProcessedData }) => {
  const [sortBy, setSortBy] = useState("");

  const getSortedData = (data, sortKey) => {
    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
      }

      return String(valA).localeCompare(String(valB));
    });
  };

  const handleChange = (event) => {
    const selectedSortKey = event.target.value;
    setSortBy(selectedSortKey);

    const sorted = getSortedData(data, selectedSortKey);
    setProcessedData(sorted);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth sx={{ height: 40 }}>
        <InputLabel id="sort-select-label" sx={{ marginTop: "-7px" }}>
          Sort By
        </InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortBy}
          label="Sort By"
          onChange={handleChange}
          sx={{
            height: 40,
            display: "flex",
            alignItems: "center",
            paddingTop: 0,
          }}
        >
          {options.map((obj, idx) => {
            const [key, value] = Object.entries(obj)[0];
            return (
              <MenuItem key={idx} value={key}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortDropdown;
