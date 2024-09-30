import { NextPage } from "next";
import { useState, Suspense } from "react";
import { ScatterplotLayer } from "@deck.gl/layers/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import * as d3 from 'd3';
import 'd3-scale-chromatic';

import { ViewState, CityDataProps } from "@/data/interfaces";

import { MapProps } from "@/components/map/mapPage";

export default function MapLayer (props: MapProps) {

    const mapPath = props.citiesArray[props.idx].path.replace("data\.json", "data-full.json");

    const this_layer: string = props.layer;

    var Color = d3.scaleSequential().domain(props.layerRange)
        .interpolator(d3.interpolateViridis)

    console.log("----MAP DETAILED LAYER----" + mapPath);

    const layers = [
        new ScatterplotLayer({
            id: 'points-layer',
            data: mapPath,
            stroked: true,
            getPosition: (d: any) => d.position,
            radiusScale: 36,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                var layerval = Math.max (props.layerRange[0], Math.min (props.layerRange[1], d[this_layer]));
                const layerIsNaN = isNaN(layerval)
                if (layerIsNaN) {
                    layerval = props.layerRange[0];
                }
                // Invert the palette:
                layerval = props.layerRange[0] + (props.layerRange[1] - layerval);
                const layerarr: any = d3.color(Color(layerval));
                var red = 0, green = 0, blue = 0;
                const layerAlpha = layerIsNaN ? 0 : 255;
                if (layerarr) {
                    red = layerarr.r;
                    green = layerarr.g;
                    blue = layerarr.b;
                }
                return [red, green, blue, layerAlpha]
            },
            opacity: 1 - props.alpha,
            updateTriggers: {
                getFillColor: [this_layer, props.layerRange]
            }
        })
    ]

    return layers
};
