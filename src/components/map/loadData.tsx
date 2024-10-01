type JSONValue =
  | string
  | number
  | boolean
  | JSONObject
  | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export async function loadDataFunction(type: string, setLoadedData: (data: JSONArray) => void) {
    const response = await fetch(`/api/gh?type=${type}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setLoadedData(data);
}

