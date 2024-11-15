export async function LoadDataDetailed(
    setLoadedData: (data: any) => void,
    mapDataGeom: any,
    numLayers: string,
    layer: string,
    handleLayerStartStopChange: (layerRange: number[]) => void
) {

    const mapPathBase = '/data/muenster/'

    const mapPathData = mapPathBase + 'data-full-' + layer + '.json';
    var data = await fetch(mapPathData)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching full data column:', error));

    if (data) {
        data = TransformData(data, layer);
        handleLayerStartStopChange(DataLayerRange(data));;
    }

    const combinedData = mapDataGeom && data
        ? Array.from({ length: Math.max(mapDataGeom.length, data.length) }, (_, i) =>
            [mapDataGeom[i] || null, data[i] || null])
        : [];

    const namedData = combinedData.map(([geomValue, dataValue]) => ({
        [`${layer}`]: dataValue,
        ["from"]: geomValue.from,
        ["to"]: geomValue.to
    }))

    setLoadedData(namedData);

    return null;

}

export async function LoadDataDetailedGeom(
    mapPathBase: string,
    setLoadedDataGeom: (data: any) => void,
) {
    const mapPathGeom = mapPathBase + 'data-full-geom.json';
    const geomData = await fetch(mapPathGeom)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching full data geometry:', error));

    setLoadedDataGeom(geomData);

    return null;
}

export async function LoadDataTransport(
    setLoadedData: (data: any) => void,
    numLayers: string,
    layer: string,
    handleLayerStartStopChange: (layerRange: number[]) => void
) {

    const mapPathBase = '/data/muenster/'

    const mapPathGeom = mapPathBase + 'data-transport-geom.json';
    const geomDataFlat = await fetch(mapPathGeom)
        .then(response => response.json() as unknown as number[][])
        .catch((error) => console.error('Error fetching transport data geometry:', error));

    // const util = require('util');
    // console.log("-----geomDataFlat = " + util.inspect(geomDataFlat, {depth: null}));

    // geomData is then read as single, flattened array, from which columns
    // need to be re-constructed:
    const geomData: { x: number[], y: number[] }= {
        x: [],
        y: []
    };
    if (geomDataFlat) {
        geomDataFlat.forEach((item: number[]) => {
            geomData.x.push(item[0]);
            geomData.y.push(item[1]);
        })
    }

    const mapPathData = mapPathBase + 'data-transport-' + layer + '.json';
    var data = await fetch(mapPathData)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching transport data column:', error));

    if (data) {
        data = TransformData(data, layer);
        handleLayerStartStopChange(DataLayerRange(data));;
    }

    const combinedData = data && geomData &&
        data.map((_: any, index: number) => ({
            [layer]: data[index],
            position: [geomData.x[index], geomData.y[index]]
        }));

    // const util = require('util');
    // console.log("-----str combinedData = " + util.inspect(combinedData, {depth: null}));

    if (combinedData) {
        setLoadedData(combinedData);
    }

    return null;

}
export async function LoadDataAggregate(
    setLoadedData: (data: number) => void,
    numLayers: string,
    layer: string,
    handleLayerStartStopChange: (layerRange: number[]) => void
) {

    const mapPathBase = '/data/muenster/'

    var mapPath;
    const fname: string = numLayers == "Paired" ? 'data2.json' : 'data.json';
    mapPath = mapPathBase + fname;

    fetch(mapPath)
        .then(response => response.json())
        .then(data => setLoadedData(data))
        .catch((error) => console.error('Error:', error));

    return null;
}

function TransformData(data: number[], layer: string): number[] {

    data = data.map((val: number) => typeof val === "string" && val === "NA" ? NaN : Number (val));
    if (layer === "bike_index" || layer === "natural") {
        data.forEach((x: number, index: number) => {
            data[index] = 1 - x;
        })
    } else if (layer === "school_dist" || layer === "popdens" || layer === "intervals") {
        data.forEach((x: number, index: number) => {
            data[index] = Math.log10(x);
        })
    }

    return data;
}

function DataLayerRange(data: number[]): number[] {

    const layerMin = Math.min(...data.filter(Number.isFinite));
    const layerMax = Math.max(...data.filter(Number.isFinite));
    return [layerMin, layerMax];
}
