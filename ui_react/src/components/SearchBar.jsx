import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  Paper,
  Grid,
} from "@mui/material";
import { ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = ({ setData, selected }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions as the user types
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`/suggest?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  // Handle form submission for search
  const handleSubmit = async (e) => {
    e.file ? setQuery(e.file) : e.preventDefault();
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      // Combine the selected item (if any) and the rest of the results
      const combined = [];
      if (data.selected && Object.keys(data.selected).length > 0) {
        combined.push(data.selected);
      }
      if (data.results && data.results.length > 0) {
        combined.push(...data.results);
      }
      setData(combined);
    } catch (error) {
      console.error("Search error:", error);
    }
    setSuggestions([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid style={{ position: "relative", width: "100%" }}>
        <Grid sx={{ display: "flex" }}>
          <TextField
            // variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a disease term or PDF file..."
            fullWidth
            size="small"
            sx={{ background: "#ffffff" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ padding: "8px 12px", background: "#0e747a" }}
          >
            <SearchIcon />
          </Button>
        </Grid>
        <ClickAwayListener onClickAway={() => setSuggestions([])}>
  <div style={{ position: "relative" }}>
    {suggestions.length > 0 && !selected && (
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          zIndex: 10,
          mt: 1,
        }}
      >
        <List>
          {suggestions.map((sug, idx) => (
            <ListItem
              key={idx}
              button
              onClick={() => handleSubmit(sug)}
              sx={{ borderBottom: "1px solid #eee" }}
            >
              {sug.file} ({sug.count})
            </ListItem>
          ))}
        </List>
      </Paper>
    )}
  </div>
</ClickAwayListener>
      </Grid>
    </form>
  );
};

export default SearchBar;
