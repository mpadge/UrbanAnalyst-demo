export async function loadDataFunction(type: string, setLoadedData: (data: number) => void, numLayers: string) {

    const mapPathBase = '/data/muenster/'

    var mapPath;
    if (type === 'detailed') {
        mapPath = mapPathBase + 'data-full.json';
    } else if (type === 'transport') {
        mapPath = mapPathBase + 'data-transport.json';
    } else { // 'aggregate'
        const fname: string = numLayers == "Paired" ? 'data2.json' : 'data.json';
        mapPath = mapPathBase + fname;
    }

    fetch(mapPath)
        .then(response => response.json())
        .then(data => setLoadedData(data))
        .catch((error) => console.error('Error:', error));
}

