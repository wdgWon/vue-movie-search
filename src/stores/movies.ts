import { ref, reactive, computed, watch, readonly } from 'vue';
import { defineStore } from 'pinia';
import type { Movies, MovieDetail } from './interface';

interface MoviesWithLoading extends Movies {
    isLoading: boolean;
}

export const useMovieStore = defineStore('movie', () => {
    const movies = reactive({ isLoading: false } as MoviesWithLoading);

    const fetchMovies = async (search = '', page = 1) => {
        try {
            movies.isLoading = true;
            const res = await fetch('/api/getMovies', {
                method: 'POST',
                body: JSON.stringify({ search, page }),
            });
            const { Search, totalResults, Response }: Movies = await res.json();

            movies.Response = Response;

            if (Response === 'True') {
                movies.Search = Search.map(movie => ({...movie, Poster: movie.Poster.replace(/SX300.jpg$/, "SX200.jpg")}));
                movies.totalResults = totalResults;
            } else {
                alert('검색 결과가 없습니다!');
            }
        } catch (error) {
            console.error(error);
        } finally {
            movies.isLoading = false;
        }
    };

    const isMovies = computed(() => {
        return movies.Response === 'True';
    });

    return { movies, isMovies, fetchMovies };
});

export const useMovieDetailStore = defineStore('movie-detail', () => {
    const movieDetail = reactive([] as MovieDetail[]);
    const isLoading = ref(false);

    const isMovieDetail = (movieId: string) => movieDetail.some(({ imdbID }) => imdbID === movieId);

    const fetchMovieDetail = async (movieId: string, plot: 'short' | 'full' = 'short') => {
        if (isMovieDetail(movieId)) return null;
        try {
            isLoading.value = true;
            const res = await fetch('/api/getMovieDetail', {
                method: 'POST',
                body: JSON.stringify({ movieId, plot }),
            });
            const data: MovieDetail = await res.json();

            if (data.Response === 'True') {
                movieDetail.push({...data, Poster: data.Poster.replace(/SX300.jpg$/, "SX400.jpg")});
            } else {
                alert('검색 결과가 없습니다!');
            }
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    watch(
        () => movieDetail.length,
        (len) => {
            while (10 < len--) {
                movieDetail.shift();
            }
        }
    );

    const getMovieDetail = (movieId: string) => {
        return readonly(movieDetail.find(({ imdbID }) => imdbID === movieId) as MovieDetail);
    };

    return { movieDetail, isMovieDetail, isLoading, getMovieDetail, fetchMovieDetail };
});
