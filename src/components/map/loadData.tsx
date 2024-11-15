export async function LoadDataDetailedFunction(
    setLoadedData: (data: any) => void,
    numLayers: string,
    layer: string,
    handleLayerStartStopChange: (layerRange: number[]) => void
) {

    const mapPathBase = '/data/muenster/'

    const mapPathGeom = mapPathBase + 'data-full-geom.json';
    const geomData = await fetch(mapPathGeom)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching full data geometry:', error));

    const mapPathData = mapPathBase + 'data-full-' + layer + '.json';
    var data = await fetch(mapPathData)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching full data column:', error));

    if (data) {
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
        const layerMin = Math.min(...data.filter(Number.isFinite));
        const layerMax = Math.max(...data.filter(Number.isFinite));
        const layerRange = [layerMin, layerMax];
        handleLayerStartStopChange(layerRange);
    }

    const combinedData = geomData && data
        ? Array.from({ length: Math.max(geomData.length, data.length) }, (_, i) =>
            [geomData[i] || null, data[i] || null])
        : [];

    const namedData = combinedData.map(([geomValue, dataValue]) => ({
        [`${layer}`]: dataValue,
        ["from"]: geomValue.from,
        ["to"]: geomValue.to
    }))

    setLoadedData(namedData);

    return null;

}

export async function LoadDataTransportFunction(
    setLoadedData: (data: any) => void,
    numLayers: string,
    layer: string,
    handleLayerStartStopChange: (layerRange: number[]) => void
) {

    const mapPathBase = '/data/muenster/'

    const mapPathGeom = mapPathBase + 'data-transport-geom.json';
    const geomDataFlat = await fetch(mapPathGeom)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching transport data geometry:', error));

    // const util = require('util');
    // console.log("-----geomDataFlat = " + util.inspect(geomDataFlat, {depth: null}));

    // geomData is then read as single, flattened array, from which columns
    // need to be re-constructed:
    const geomData = {
        x: [],
        y: []
    };
    geomDataFlat.forEach(item => {
        geomData.x.push(item[0]);
        geomData.y.push(item[1]);
    })

    const mapPathData = mapPathBase + 'data-transport-' + layer + '.json';
    var data = await fetch(mapPathData)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching transport data column:', error));

    if (data) {
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
        const layerMin = Math.min(...data.filter(Number.isFinite));
        const layerMax = Math.max(...data.filter(Number.isFinite));
        const layerRange = [layerMin, layerMax];
        handleLayerStartStopChange(layerRange);
    }

    const combinedData = geomData && data
        ? Array.from({ length: Math.max(geomData.x.length, data.length) }, (_, i) =>
            [geomData.x[i] || null, geomData.y[i] || null, data[i] || null])
        : [];

    const util = require('util');
    console.log("-----typeof combinedData = " + typeof(combinedData));
    console.log("-----str combinedData = " + util.inspect(combinedData, {depth: null}));
    console.log("-----combinedData = " + combinedData);

    const namedData = combinedData.map(([value]) => ({
        [`${layer}`]: value[0],
        ["x"]: value[1],
        ["y"]: value[2]
    }))

    console.log("-----namedData = " + util.inspect(namedData, {depth: null}));

    setLoadedData(namedData);

    return null;

}
export async function LoadDataFunction(type: string, setLoadedData: (data: number) => void, numLayers: string, layer: string) {

    const mapPathBase = '/data/muenster/'

    var mapPath;
    if (type === 'transport') {
        mapPath = mapPathBase + 'data-transport.json';
    } else { // 'aggregate'
        const fname: string = numLayers == "Paired" ? 'data2.json' : 'data.json';
        mapPath = mapPathBase + fname;
    }
    fetch(mapPath)
        .then(response => response.json())
        .then(data => setLoadedData(data))
        .catch((error) => console.error('Error:', error));

    return null;
}

