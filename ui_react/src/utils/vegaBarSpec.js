export const vegaBarSpec = (
    data, plotConfig
) => {
    const { xAxis, yAxis, xAxisTitle, yAxisTitle } = plotConfig
    return {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "description": "A basic bar chart example, with value labels shown upon pointer hover.",
        "width": 600,
        "height": 250,
        "padding": 5,

        "data": [
            {
                "name": "table",
                "values": data
            }
        ],

        "signals": [
            {
                "name": "tooltip",
                "value": {},
                "on": [
                    { "events": "rect:pointerover", "update": "datum" },
                    { "events": "rect:pointerout", "update": "{}" }
                ]
            }
        ],

        "scales": [
            {
                "name": "xscale",
                "type": "band",
                "domain": { "data": "table", "field": xAxis },
                "range": "width",
                "padding": 0.05,
                "round": true
            },
            {
                "name": "yscale",
                "domain": { "data": "table", "field": yAxis },
                "nice": true,
                "range": "height"
            }
        ],

        "axes": [
            {
                "orient": "bottom",
                "scale": "xscale",
                "labelAngle": "35",
                "title": xAxisTitle,
                "labelPadding": 30,
                "labelAlign": "center",
                "labelBaseline": "top",
                "labelOffset": 40,
            },
            { "orient": "left", "scale": "yscale", "title": yAxisTitle }
        ],

        "marks": [
            {
                "type": "rect",
                "from": { "data": "table" },
                "encode": {
                    "enter": {
                        "x": { "scale": "xscale", "field": xAxis },
                        "width": { "scale": "xscale", "band": 1 },
                        "y": { "scale": "yscale", "field": yAxis },
                        "y2": { "scale": "yscale", "value": 0 }
                    },
                    "update": {
                        "fill": { "value": "steelblue" }
                    },
                    "hover": {
                        "fill": { "value": "red" }
                    }
                }
            },
            {
                "type": "text",
                "encode": {
                    "enter": {
                        "align": { "value": "center" },
                        "baseline": { "value": "bottom" },
                        "fill": { "value": "#333" }
                    },
                    "update": {
                        "x": { "scale": "xscale", "signal": `tooltip.${xAxis}`, "band": 0.5 },
                        "y": { "scale": "yscale", "signal": `tooltip.${yAxis}`, "offset": -2 },
                        "text": { "signal": `tooltip.${yAxis}` },
                        "fillOpacity": [
                            { "test": "datum === tooltip", "value": 0 },
                            { "value": 1 }
                        ]
                    }
                }
            }
        ],
        "usermeta": {
            "embedOptions": {
                "renderer": "svg",
                "actions": {
                    "export": true,
                    "source": false,
                    "editor": false
                }
            }
        }

    };
};
