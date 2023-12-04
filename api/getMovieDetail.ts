import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const { API_GET_MOVIES_URL, API_GET_MOVIES_KEY } = process.env;

export default async function (request: VercelRequest, response: VercelResponse) {
    const { movieId, plot } = JSON.parse(request.body);

    try {
        const res = await axios(
            `${API_GET_MOVIES_URL}?apikey=${API_GET_MOVIES_KEY}&i=${movieId}&plot=${plot}`
        );
        response.status(200).json(res.data);
    } catch (error) {
        response.status(400).json({
            error,
        });
    }
}
