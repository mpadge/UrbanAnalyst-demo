import { NextPage } from "next";
import { useMemo, useEffect, useState, Suspense } from "react";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";

import mapLayer from '@/components/map/mapLayer'
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

    const this_layer = props.dataSource == "aggregate" ? mapLayer(props) : mapLayerDetailed(props);
    const [layer, setLayer] = useState(this_layer);

    useEffect(() => {
        const this_layer = props.dataSource == "aggregate" ? mapLayer(props) : mapLayerDetailed(props);
        setLayer(this_layer);
    }, [props]);

    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        const mapPath = props.citiesArray[props.idx].path.replace("data\.json", "data-full.json");

        fetch(mapPath)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.map(item => ({
                    position: item.position,
                    layer: item[layer]
                }));

                setMapData(filteredData);
            })
            .catch((error) => console.error('Error:', error));
    }, [props.idx, props.layer])

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
                        layers={layer}
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
