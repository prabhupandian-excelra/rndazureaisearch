import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import FilterPanel from "./FilterPanel";
import TabContent from "./TabContent";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { downloadJson } from "../utils/downloadJson";
import SortDropdown from "./SortDropdown";
import { tabConfig } from "../utils/tabConfig";

const MainContent = ({ data, selected, setSelected, setData }) => {
  const [filters, setFilters] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState(data);
  const plotConfig = {
    xAxis: "name",
    yAxis: "count",
    xAxisTitle: "File Name",
    yAxisTitle: "Count",
  };
  const sortOptions = [{ name: "Name" }, { count: "Count" }];
  
  const filteredDataFunc = () =>
    data.filter((obj) =>
      Object.values(obj).some(
        (value) =>
          typeof value === "string" &&
          filters.some((keyword) =>
            value.toLowerCase().includes(keyword.toLowerCase())
          )
      )
    );
  React.useEffect(() => {
    setFilteredData(filteredDataFunc().length > 0 ? filteredDataFunc() : data);
    // if (filters.length === 0) {
    //   setFilters([]);
    // }
  }, [data, filters]);

  return (
    <Grid className="mainContent">
      <Grid container spacing={2}>
        <Grid size={3}>
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            <Grid sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <ArrowCircleLeftIcon
                sx={{ color: "#00796B", cursor: "pointer" }}
                fontSize="large"
                onClick={() => {
                  window.location.reload();
                }}
              />
              {`Search Results (${filteredData?.length})`}
            </Grid>
          </Typography>
        </Grid>
        <Grid container justifyContent="flex-end" spacing={2} size={9}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => downloadJson(data, "Results")}
            disabled={!data.length}
            sx={{ height: "40px",background:'#01a4b8' }}
          >
            Download
          </Button>
          <SortDropdown
            data={data}
            options={sortOptions}
            setProcessedData={setData}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={3}>
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            setData={setData}
            data={data}
          />
        </Grid>
        <Grid size={9}>
          <TabContent
            tabs={tabConfig(filteredData, setSelected, selected, plotConfig)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MainContent;
