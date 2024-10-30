export async function LoadDataDetailedFunction(setLoadedData: (data: any) => void, numLayers: string, layer: string) {

    const mapPathBase = '/data/muenster/'

    const mapPathGeom = mapPathBase + 'data-full-geom.json';
    const geomData = await fetch(mapPathGeom)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching full data geometry:', error));

    const mapPathData = mapPathBase + 'data-full-' + layer + '.json';
    const data = await fetch(mapPathData)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching full data column:', error));

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

