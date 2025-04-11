import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchBar from "./SearchBar";

const Header = ({ setData, selected }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#01a4b8", boxShadow: 0 }}>
      <Toolbar>
        <Grid container alignItems="center" width={"100%"}>
          <Grid size={3} sx={{ textAlign: "left" }}>
            <img
              src="/Excelra-Logo.png"
              alt="Site Logo"
              width="150"
              height="auto"
            />
          </Grid>
          <Grid size={6} sx={{ textAlign: "center" }}>
            <SearchBar setData={setData} selected={selected} />
          </Grid>
          <Grid size={3} sx={{ textAlign: "right" }}>
            <IconButton color="inherit">Excelra</IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
