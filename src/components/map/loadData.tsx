export async function LoadDataDetailedFunction(setLoadedData: (data: number[]) => void, numLayers: string, layer: string) {

    const mapPathBase = '/data/muenster/'

    const mapPathGeom = mapPathBase + 'data-full-geom.json';
    const geomData = await fetch(mapPathGeom)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching full data geometry:', error));
    console.log("-----GEOMDATA = ", geomData);

    const mapPathData = mapPathBase + 'data-full-' + layer + '.json';
    console.log("-----MAPPATHDATA = " + mapPathData);
    const data = await fetch(mapPathData)
        .then(response => response.json())
        .catch((error) => console.error('Error fetching full data column:', error));
    console.log("-----DATA COLUMN for layer [" + layer + "] = ", data);

    const combinedData = geomData && data ? [...(geomData as number[]), ...(data as number[])] : [];
    console.log("-----COMBINEDDATA = ", combinedData);
    setLoadedData(combinedData);

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

