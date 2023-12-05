<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import SearchHeader from './components/SearchHeader.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import { useMovieDetailStore, useMovieStore } from './stores/movies';

const movieDetail = useMovieDetailStore();
const movies = useMovieStore();
const route = useRoute();
</script>

<template>
    <SearchHeader v-if="route.fullPath !== '/'" />
    <LoadingSpinner v-if="movies.movies.isLoading || movieDetail.isLoading" />
    <RouterView class="relative z-0"/>
</template>
