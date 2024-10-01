export async function loadDataFunction(type: string, handleDataChange: (data: number) => void) {
    const response = await fetch(`/api/gh?type=${type}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    handleDataChange(data);
}

