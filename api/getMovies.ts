import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';
dotenv.config();

const { API_GET_MOVIES_URL, API_GET_MOVIES_KEY } = process.env;

export default async function (request: VercelRequest, response: VercelResponse) {
    const { search, page } = JSON.parse(request.body);

    try {
        const res = await fetch(
            `${API_GET_MOVIES_URL}?apikey=${API_GET_MOVIES_KEY}&s=${search}&page=${page}`
        );
        const data = await res.json();
        response.status(200).json(data);
    } catch (error) {
        response.status(400).json({
            error,
        });
    }
}
