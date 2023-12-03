import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

interface ResponseValue {
    Search: Search[];
    totalResults: string;
    Response: string;
}

interface Search {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

interface initailValue extends ResponseValue {}

export const useMovieStore = defineStore('movie', () => {
    const movies = reactive({} as initailValue);

    const fetchMovies = async (search = '', page = 1) => {
        try {
            const res = await fetch('/api/getMovies', {
                method: 'POST',
                body: JSON.stringify({ search, page }),
            });
            const { Search, totalResults, Response }: ResponseValue = await res.json();

            movies.totalResults = totalResults;
            movies.Response = Response;

            if (Response === 'True') {
                Search.forEach((s) => (movies.Search = [...(movies.Search ?? []), s]));
            } else {
                alert('검색 결과가 없습니다!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isMovies = computed(() => {
        return movies.Response === 'True';
    });

    return { movies, isMovies, fetchMovies };
});
