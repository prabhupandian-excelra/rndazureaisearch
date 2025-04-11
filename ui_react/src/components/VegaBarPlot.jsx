// src/VegaBarPlot.js
import React, { useEffect, useRef } from "react";
import vegaEmbed from "vega-embed";
import { vegaBarSpec } from "../utils/vegaBarSpec";
import { Typography, Grid } from "@mui/material";
const VegaBarPlot = ({ data, plotConfig }) => {

    const chartRef = useRef(null);

    useEffect(() => {
        if (data.length > 0) {
            vegaEmbed(
                chartRef.current,
                vegaBarSpec(data, plotConfig)
            );
        }
    }, [data, plotConfig]);

    return (data.length === 0 ? (
        <Typography variant="subtitle1" component="div">
            No results to display.
        </Typography>
    ) : <Grid ref={chartRef}></Grid>)
};

export default VegaBarPlot;
