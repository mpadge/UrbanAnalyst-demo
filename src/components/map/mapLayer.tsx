import { NextPage } from "next";
import { useEffect, useState, Suspense } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import * as d3 from 'd3';
import 'd3-scale-chromatic';

import { ViewState, CityDataProps } from "@/data/interfaces";

import { MapProps } from "@/components/map/mapPage";

export default function MapLayer (props: MapProps) {

    if (props.data === null) return [];

    // This code also repeated in mapPage.tsx to calculate [layerMin, layerMax] props.
    const layer1: string = props.layer.replace("\_", "").replace("index", "");
    const layer2: string = props.layer2.replace("\_", "").replace("index", "");
    const paired_keys = Object.keys(props.citiesArray[props.idx].dataRangesPaired);

    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2) ?
            layer1 + "_" + layer2 : layer2 + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);

    const this_layer: string = props.numLayers == "Paired" && dual_layers ?
        these_layers : props.layer;

    var Color = d3.scaleSequential().domain(props.layerRange)
        .interpolator(d3.interpolateViridis)

    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: props.data,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                var layerval = Math.max (props.layerRange[0], Math.min (props.layerRange[1], d.properties?.[this_layer]));
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
