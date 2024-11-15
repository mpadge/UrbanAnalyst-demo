"use client"

import { useEffect, useRef, useState } from "react";
import { DeckGL } from "@deck.gl/react/typed";
import { FlyToInterpolator } from "@deck.gl/core/typed";
import { Map } from "react-map-gl";

import Control from '@/components/map/control';
import Legend from '@/components/map/legend';
import UTAMap from '@/components/map/map';
import Tour from '@/components/map/tour/tour';
import { LoadDataAggregateFunction, LoadDataDetailedFunction, LoadDataTransportFunction } from '@/components/map/loadData';
import useWindowSize from '@/components/windowSize';
import { getTourConfig } from '@/components/map/tour/tourConfig';
import tourStyles from '@/styles/tour.module.css';
import getPreferredTourClass from '@/components/tourClass';

import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/data/citydata';
import { CityDataProps, DataRangeKeys, Data2RangeKeys, ViewState } from '@/data/interfaces';

/**
 * Definition of interface for `MapProps`. These are constructed in
 * here and passed through to {@link map}. Individual props are:
 *
 * - `idx`: The integer defining the city from the full `CITY_DATA.citiesArray`.
 * - `dataSource`: Path to local JSON data source.
 * - `data`: Loaded JSON data from GitHub LFS.
 * - `layer`: The string defining the single layer to be diplayed.
 * - `layer2`: The string defining the optional paired layer to be used to
 *    display pairwise relationship.
 * - `numLayers`: String equal to either "single" or "paired".
 * - `alpha`: Opacity of rendered map (0 - 1).
 * - `layerRange`: Range of values to be plotted on map; obtained from the
 *   `rangeSlider` input.
 * - `layerStartStop`: Range of values spanned by `layerRange` slider. These are
 *   defined on page load, and fixed from then on.
 *
 * Scales for colour schemes, and whether they are reversed or log-scaled, are
 * defined for the detailed layer data in `loadData` and `legend`.
 */
export interface MapProps {
    idx: number,
    dataSource: string,
    data?: any,
    layer: string,
    layer2: string,
    numLayers: string,
    alpha: number,
    layerRange: number[],
    layerStartStop: number[],
    viewState: ViewState,
    citiesArray: CityDataProps[],
    isDataLoadingComplete: boolean,
    handleAlphaChange: (pAlpha: number) => void,
    handleViewStateChange: (pViewState: ViewState) => void,
    handleDataSourceChange: (dataSource: string) => void,
    handleLayerChange: (layer: string) => void
    handleLayer2Change: (layer2: string) => void
    handleLayerRangeChange: (layerRange: number[]) => void,
    handleLayerStartStopChange: (layerRange: number[]) => void,
}

/**
 * Main Map Page component
 *
 * This constructs all state variables passed on as `MapProps` to the actual
 * `map.tsx` which renders to DeckGL and underlying map components.
 *
 * The only additional state variables not defined as part of `MapProps`
 * are those related to the ReactTour components.
 */
export default function MapPage() {

    const [idx, setIdx] = useState(0);
    const [dataSource, setDataSource] = useState("");

    const [cityData, setCityData] = useState(CITY_DATA.citiesArray[idx]);
    const [viewState, setViewState] = useState({
        ...CITY_DATA.citiesArray[idx].initialViewState,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });
    const [layer, setLayer] = useState("social_index");
    const [layer2, setLayer2] = useState("");
    const [alpha, setAlpha] = useState(0.5);
    const [numLayers, setNumLayers] = useState("Single");
    const numLayersOptions = ["Single", "Paired"];
    const [cityLayers, setCityLayers] = useState<string[]>([]);

    const [layerStartStop, setLayerStartStop] = useState<number[]>([0, 1]);
    const [layerRange, setLayerRange] = useState<number[]>([0, 1]);

    const [mapData, setLoadedData] = useState<any | null>(null);

    useEffect(() => {
        var layerLocal = "social_index";
        var layer2Local = "";
        var numLayersLocal = "Single";
        var alphaLocal = 0.5;
        var dataSourceLocal = "aggregate";
        if (typeof window != "undefined") {
            const storedLayer = localStorage.getItem('uaLayer');
            if(storedLayer) {
                layerLocal = storedLayer;
            }
            const storedLayer2 = localStorage.getItem('uaLayer2');
            if(storedLayer2) {
                layer2Local = storedLayer2;
            }
            const storedNumLayers = localStorage.getItem('uaNumLayers');
            if(storedNumLayers) {
                numLayersLocal = storedNumLayers;
            }
            const storedAlpha = localStorage.getItem('uaAlpha');
            if(storedAlpha) {
                alphaLocal = parseFloat(storedAlpha);
                if (isNaN(alphaLocal)) {
                    alphaLocal = 0.5;
                }
            }

            const storedDataSource = localStorage.getItem('uaDataSource');
            if (storedDataSource) {
                dataSourceLocal = storedDataSource;
            }
        }
        setLayer(layerLocal);
        setLayer2(layer2Local);
        setNumLayers(numLayersLocal);
        setAlpha(alphaLocal);
        setDataSource(dataSourceLocal);

        const theseLayers = Object.keys(CITY_DATA.citiesArray[idx].dataRanges);
        setCityLayers(theseLayers);
        if (!theseLayers.includes(layerLocal)) {
            layerLocal = "social_index";
            setLayer(layerLocal);
            localStorage.removeItem('uaLayer');
        }
        if (!theseLayers.includes(layer2Local)) {
            layer2Local = "social_index";
            setLayer2(layer2Local);
            localStorage.removeItem('uaLayer2');
        }

        // layer_min/max values which can be adjusted with range slider. This
        // code is also repeated in mapLayer.tsx.
        const layer1: string = layer.replace("\_", "").replace("index", "");
        const layer2_repl: string = layer2.replace("\_", "").replace("index", "");
        const paired_keys = Object.keys(CITY_DATA.citiesArray[idx].dataRangesPaired);

        const these_layers =
            paired_keys.includes(layer1 + "_" + layer2_repl) ?
                layer1 + "_" + layer2_repl : layer2_repl + "_" + layer1;
        const dual_layers: boolean = paired_keys.includes(these_layers);

        const this_layer: string = numLayers == "Paired" && dual_layers ?
            these_layers : layer;

        const layer_start = numLayers == "Paired" && dual_layers ?
            CITY_DATA.citiesArray[idx].dataRangesPaired[these_layers as Data2RangeKeys][0] :
            CITY_DATA.citiesArray[idx].dataRanges[this_layer as DataRangeKeys][0];
        const layer_min = numLayers == "Paired" && dual_layers ?
            CITY_DATA.citiesArray[idx].dataRangesPaired[these_layers as Data2RangeKeys][1] :
            CITY_DATA.citiesArray[idx].dataRanges[this_layer as DataRangeKeys][1];
        const layer_max = numLayers == "Paired" && dual_layers ?
            CITY_DATA.citiesArray[idx].dataRangesPaired[these_layers as Data2RangeKeys][2] :
            CITY_DATA.citiesArray[idx].dataRanges[this_layer as DataRangeKeys][2];
        const layer_stop = numLayers == "Paired" && dual_layers ?
            CITY_DATA.citiesArray[idx].dataRangesPaired[these_layers as Data2RangeKeys][3] :
            CITY_DATA.citiesArray[idx].dataRanges[this_layer as DataRangeKeys][3];

        setLayerRange([layer_min, layer_max]);
        setLayerStartStop([layer_start, layer_stop]);
    }, [idx, layer, layer2, numLayers, dataSource])

    const handleAlphaChange = (alpha: number) => {
        setAlpha(alpha);
        if (typeof window != "undefined") {
            localStorage.setItem("uaAlpha", alpha.toString());
        }
    }
    const handleViewStateChange = (pViewState: any) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
    }

    const handleDataSourceChange = (dataSource: string) => {
        if (dataSource !== "") {
            setDataSource(dataSource);
            if (typeof window != "undefined") {
                localStorage.setItem("uaDataSource", dataSource);
            }
        }
    }

    const handleLayerChange = (layer: string) => {
        setLayer(layer);
        if (typeof window != "undefined") {
            localStorage.setItem("uaLayer", layer);
        }
    }
    const handleLayer2Change = (layer2: string) => {
        setLayer2(layer2);
        if (typeof window != "undefined") {
            localStorage.setItem("uaLayer2", layer2);
        }
    }
    const handleNumLayersChange = (numLayers: string) => {
        setNumLayers(numLayers);
        if (typeof window != "undefined") {
            localStorage.setItem("uaNumLayers", numLayers);
        }
    }

    const handleLayerRangeChange = (layerRange: number[]) => {
        setLayerRange(layerRange);
    }

    const handleLayerStartStopChange = (layerRange: number[]) => {
        setLayerStartStop(layerRange);
    }

    const [dataLoadingComplete, setDataLoadingComplete] = useState<boolean>(false);
    useEffect(() => {
        const sources = ["aggregate", "transport", "detailed"];
        if (sources.indexOf(dataSource) !== -1) {
            setLoadedData(null);
            setDataLoadingComplete(false);
            if (dataSource === 'detailed') {
                LoadDataDetailedFunction(setLoadedData, numLayers, layer, handleLayerStartStopChange);
            } else if (dataSource == 'transport') {
                LoadDataTransportFunction(setLoadedData, numLayers, layer, handleLayerStartStopChange);
            } else {
                LoadDataAggregateFunction(setLoadedData, numLayers, layer, handleLayerStartStopChange);
            }
        }
    }, [dataSource, setLoadedData, setDataLoadingComplete, numLayers, layer]);

    useEffect(() => {
        if (mapData) {
            setDataLoadingComplete(true);
        }
    }, [mapData, setDataLoadingComplete]);

    // ----- TOUR start-----
    const [tourClass, setTourClass] = useState(tourStyles.tourhelperLight);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTourClass(getPreferredTourClass());
        }
    }, []);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const size = useWindowSize();
    useEffect(() => {
        const w = size?.width || 0;
        setWidth(w);
        const h = size?.height || 0;
        setHeight(h);
    }, [size])
    const tourConfig = getTourConfig(width, height);

    const accentColor = "#5cb7b7";
    const [isTourOpen, setTourOpen] = useState(false);

    const handleTourOpen = () => {
        setTourOpen(true);
    };

    // Use sessionStorage to only show tour once per session.
    const closeTour = () => {
        setTourOpen(false);
        if (typeof window != "undefined") {
            sessionStorage.setItem("uamaptour", "done");
        }
    };

    useEffect(() => {
        if(!sessionStorage.getItem('uamaptour')) {
            setTourOpen(true)
        }
    }, [])
    // ----- TOUR end-----

    return (
        <>
            <UTAMap
                idx = {idx}
                dataSource = {dataSource}
                data = {mapData}
                layer = {layer}
                layer2 = {layer2}
                numLayers = {numLayers}
                alpha = {alpha}
                layerRange = {layerRange}
                layerStartStop = {layerStartStop}
                citiesArray = {CITY_DATA.citiesArray}
                viewState = {viewState}
                isDataLoadingComplete = {dataLoadingComplete}
                handleAlphaChange = {handleAlphaChange}
                handleViewStateChange = {handleViewStateChange}
                handleDataSourceChange = {handleDataSourceChange}
                handleLayerChange = {handleLayerChange}
                handleLayer2Change = {handleLayer2Change}
                handleLayerRangeChange = {handleLayerRangeChange}
                handleLayerStartStopChange = {handleLayerStartStopChange}
            />
            <Control
                idx = {idx}
                dataSource = {dataSource}
                layer = {layer}
                layer2 = {layer2}
                numLayers = {numLayers}
                numLayersOptions = {numLayersOptions}
                alpha = {alpha}
                layerRange = {layerRange}
                layerStartStop = {layerStartStop}
                citiesArray = {CITY_DATA.citiesArray}
                cityLayers = {cityLayers}
                viewState = {viewState}
                handleNumLayersChange = {handleNumLayersChange}
                handleAlphaChange = {handleAlphaChange}
                handleViewStateChange = {handleViewStateChange}
                handleDataSourceChange = {handleDataSourceChange}
                handleLayerChange = {handleLayerChange}
                handleLayer2Change = {handleLayer2Change}
                handleLayerRangeChange = {handleLayerRangeChange}
                handleLayerStartStopChange = {handleLayerStartStopChange}
                handleTourOpen = {handleTourOpen}
            />
            <Legend
                idx = {idx}
                layerRange = {layerRange}
                layer = {layer}
                layer2 = {layer2}
                numLayers = {numLayers}
                alpha = {alpha}
                citiesArray = {CITY_DATA.citiesArray}
            />
            <Tour
                onRequestClose={closeTour}
                disableInteraction={false}
                steps={tourConfig}
                isOpen={isTourOpen}
                maskClassName={tourStyles.tourmask}
                className={tourClass}
                rounded={5}
                accentColor={accentColor}
            />
        </>
    )
}
