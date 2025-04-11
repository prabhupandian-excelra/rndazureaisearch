import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";

const mockFilters = {
  Document: [
    { name: "University", count: 1 },
    { name: "Citation", count: 2 },
    // { name: "Classification", count: 2 },
    // { name: "Status", count: 1 },
    // { name: "Product Family Name", count: 4 },
    // { name: "Business Unit", count: 1 },
    // { name: "Functional Group", count: 2 },
  ],
};

const FilterPanel = ({ data, filters, setFilters, setData }) => {
  const [expanded, setExpanded] = useState(false);
  // const [test, setTest] = useState(data);
  // const filteredData = () =>
  //   data.filter((obj) =>
  //     Object.values(obj).some(
  //       (value) =>
  //         typeof value === "string" &&
  //         filters.some((keyword) =>
  //           value.toLowerCase().includes(keyword.toLowerCase())
  //         )
  //     )
  //   );
  const handleFilters = (filterName) => {
    if (!filters.includes(filterName)) {
      setFilters([...filters, filterName]);
    } else {
      setFilters(filters.filter((item) => item !== filterName));
    }
  };
  // React.useEffect(() => {
  //   setTest(filteredData);
  // }, [filters]);

  // console.log(test);

  return (
    <div style={{ width: "100%", border: "1px solid #ccc", borderRadius: 5 }}>
      {/* Common Filters Section */}
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FilterListIcon style={{ marginRight: 8 }} />
          <Typography>Common Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            {filters.Document.map((filter, index) => (
              <ListItem key={index} button>
                <ListItemText primary={filter.name} />
                <Typography color="textSecondary">{filter.count}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion> */}

      {/* Document Filters Section */}
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{background:'#f9f8fd'}}>
          <FilterListIcon style={{ marginRight: 8 }} />
          <Typography>Document</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            {mockFilters.Document.map((filter, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleFilters(filter.name)}
              >
                <ListItemText
                  primary={filter.name}
                  style={{
                    color: filters.includes(filter.name) ? "#00796b" : "black",
                  }}
                />
                {/* <Typography color="textSecondary">{filter.count}</Typography> */}
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterPanel;
