import { NextPage } from "next";
import { useMemo, useEffect, useState, Suspense } from "react";
import { DeckGL } from "@deck.gl/react/typed";
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

/**
 * Map function to load DeckGL overlap and base map.
 *
 * The only state variable constructed here is `layer`, which is necessary
 * because this is returned from the `mapLayer` function defined in
 * `mapLayer.tsx`. That function must first be called to obtain the layer before
 * passing to final DOM elements in return body of this function.
 */
export default function UTAMap (props: MapProps) {

    const [thisGeoJsonLayer, setThisGeoJsonLayer] = useState(mapLayer(props));;
    const [thisLineLayer, setThisLineLayer] = useState(mapLayerDetailed(props));;
    const [thisPointsLayer, setThisPointsLayer] = useState(mapLayerTransport(props));;

    useEffect(() => {
        if (props.dataSource == "aggregate") {
            setThisGeoJsonLayer(mapLayer(props));
        } else if (props.dataSource == "detailed") {
            setThisLineLayer(mapLayerDetailed(props));
        } else if (props.dataSource == "transport") {
            setThisPointsLayer(mapLayerTransport(props));
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


    return (
        <>
            {(
                <Suspense fallback={<p>Loading map ...</p>}>

                    <DeckGL
                        width={"100vw"}
                        height={"100vh"}
                        controller={true}
                        layers={
                            props.dataSource == "aggregate" ? thisGeoJsonLayer :
                                (props.dataSource == "detailed" ? thisLineLayer :
                                thisPointsLayer)
                        }
                        initialViewState={props.viewState}
                    >
                        <Map
                            mapStyle={MAP_STYLE}
                            mapboxAccessToken={MapboxAccessToken}
                        >
                        </Map>
                    </DeckGL>
                </Suspense>
            )}
        </>
    )
};
