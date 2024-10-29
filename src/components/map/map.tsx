import { NextPage } from "next";
import { useMemo, useEffect, useRef, useState, Suspense } from "react";
import { DeckGL } from "@deck.gl/react/typed";
import { TextLayer } from "@deck.gl/layers/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";

import mapLayer from '@/components/map/mapLayer'
import mapLayerTransport from '@/components/map/mapLayerTransport'
import mapLayerDetailed from '@/components/map/mapLayerDetailed'

import { ViewState, CityDataProps } from "@/data/interfaces";
import { MapProps } from "@/components/map/mapPage";

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

const TEXT_DATA: any = [{
    text: 'Loading data ...',
    position: [7.633, 51.964]
}]

/**
 * Map function to load DeckGL overlap and base map.
 *
 * The only state variable constructed here is `layer`, which is necessary
 * because this is returned from the `mapLayer` function defined in
 * `mapLayer.tsx`. That function must first be called to obtain the layer before
 * passing to final DOM elements in return body of this function.
 */
export default function UTAMap (props: MapProps) {

    const [thisLayer, setThisLayer] = useState<any>(null);

    useEffect(() => {
        setThisLayer(null);
        if (props.data) {
            if (props.dataSource == "aggregate") {
                setThisLayer(mapLayer(props));
            } else if (props.dataSource == "detailed") {
                setThisLayer(mapLayerDetailed(props));
            } else if (props.dataSource == "transport") {
                setThisLayer(mapLayerTransport(props));
            }
        } else {
            // this has to always call a new layer, otherwise it fails to
            // destroy properly when layers are switched, and is then unable to
            // be re-rendered. deck.gl docs: "New layers are cheap"!
            setThisLayer(
                new TextLayer({
                    id: 'text-layer',
                    data: TEXT_DATA,
                    getPosition: (d: any) => d.position,
                    getText: (d: any) => d.text,
                    getAlignmentBaseline: 'center',
                    getColor: [255, 128, 0],
                    getFillColor: [255, 128, 0],
                    getSize: 48,
                    getTextAnchor: 'middle'
                })
            );
        }
    }, [props]);

    const [mapData, setMapData] = useState(null);
    const [initialSetMapData, setInitialSetMapData] = useState(true);

    const { dataSource, idx, layer, citiesArray, handleLayerRangeChange } = props;
    useEffect(() => {

        if (dataSource === "transport" || dataSource == "detailed") {

            const filename = dataSource === "transport" ? "data-points.json" : "data-full.json";
            const mapPath = citiesArray[idx].path.replace("data\.json", filename);

            fetch(mapPath)
                .then(response => response.json())
                .then(data => {
                    const filteredData = data.map((item: any) => ({
                        position: item.position,
                        layer: item[layer]
                    }));

                    if (filteredData) {

                        setMapData(filteredData);

                        if (initialSetMapData) {
                            const layerMin = Math.min(...filteredData.map((d: any) => d.layer));
                            const layerMax = Math.max(...filteredData.map((d: any) => d.layer));
                            const layerRange = [layerMin, layerMax];
                            handleLayerRangeChange(layerRange);
                            setInitialSetMapData(false);
                        }
                    }
                })
                .catch((error) => console.error('Error:', error));
        }
    }, [dataSource, idx, layer, citiesArray, handleLayerRangeChange,
            setMapData, initialSetMapData, setInitialSetMapData])

    const [viewState, setViewState] = useState({
        ...props.viewState,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });

    useEffect(() => {
        console.log("-----DATA LOADING: ", props.isDataLoadingComplete);
    }, [props.isDataLoadingComplete]);

    console.log("-----LAYER to be mapped: ", thisLayer);

    return (
        <>
            {(
                <DeckGL
                    width={"100vw"}
                    height={"100vh"}
                    controller={true}
                    layers={thisLayer}
                    initialViewState={props.viewState}
                >
                    <Map
                        mapStyle={MAP_STYLE}
                        mapboxAccessToken={MapboxAccessToken}
                    >
                    </Map>
                </DeckGL>
            )}
        </>
    )
};
