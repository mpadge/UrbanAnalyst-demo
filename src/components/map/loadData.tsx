export async function loadDataFunction(type: string, setLoadedData: (data: number) => void) {
    const response = await fetch(`/api/gh?type=${type}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data) {
        setLoadedData(data);
    }
}

