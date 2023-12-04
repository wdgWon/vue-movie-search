<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore, useMovieDetailStore } from '@/stores/movies';
import { useRouter } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const search = ref('');
const page = ref();
const movieStore = useMovieStore();
const detailStore = useMovieDetailStore();
const router = useRouter();

const handleOnSubmit = () => {
    movieStore.fetchMovies(search.value, page.value);
};

const handleOnClick = (movieId: string) => {
    detailStore.fetchMovieDetail(movieId, "full");
    router.push(`/detail/${movieId}`);
};
</script>

<template>
    <form @submit.prevent="handleOnSubmit">
        <input
            v-model="search"
            type="text"
            placeholder="movie"
        />
        <input
            v-model="page"
            type="number"
            placeholder="page"
        />
        <button type="submit">검색</button>
    </form>
    <ul v-if="movieStore.movies.isLoading === false && movieStore.isMovies">
        <li
            v-for="item in movieStore.movies.Search"
            :key="item.imdbID"
            @click="handleOnClick(item.imdbID)"
        >
            <img
                :src="item.Poster"
                :alt="item.Title"
            />
            {{ item.Title }}
        </li>
    </ul>
    <LoadingSpinner v-else-if="movieStore.movies.isLoading === true" />
</template>
<style scoped lang="scss"></style>
