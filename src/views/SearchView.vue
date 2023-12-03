<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movies';
const search = ref('');
const page = ref();
const store = useMovieStore();
const handleOnSubmit = () => {
    store.fetchMovies(search.value, page.value);
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
    <ul v-if="store.isMovies">
        <li
            v-for="item in store.movies.Search"
            :key="item.imdbID"
        >
            <img
                :src="item.Poster"
                :alt="item.Title"
            />
            {{ item.Title }}
        </li>
    </ul>
</template>
<style scoped lang="scss"></style>
