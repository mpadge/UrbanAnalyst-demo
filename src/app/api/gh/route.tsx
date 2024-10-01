import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type');

    const f_name = type === "points" ? "data-points.json" : "data-full.json";
    const url = `https://github.com/mpadge/UrbanAnalyst-demo/releases/download/v0.0.1/${f_name}`;
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache', // Attempting to cache items > 2MB errors
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();

    return Response.json(data);
}
