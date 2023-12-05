<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMovieStore } from '@/stores/movies';
import { useRouter } from 'vue-router';
import MovieSearchLogo from '@/assets/MovieSearchLogo.svg';

const search = ref('');
const movieStore = useMovieStore();
const router = useRouter();

watch(
    () => movieStore.movies.isLoading,
    (isLoading) => isLoading === false && router.push('/search')
);

const handleOnSubmit = () => {
    movieStore.fetchMovies(search.value);
    search.value = "";
};

const handleOnClickLogo = () => {
    router.push('/search');
};
</script>

<template>
    <header class="relative h-14 z-10">
        <div
            class="fixed flex justify-end tablet:justify-center items-center px-2 bg-gradient-to-t from-black/80 to-black/50 w-screen h-14 shadow-md shadow-white"
        >
            <img
                class="absolute top-1 left-2 w-40 aspect-auto cursor-pointer"
                :src="MovieSearchLogo"
                alt="Movie Search Logo"
                @click="handleOnClickLogo"
            />
            <form @submit.prevent="handleOnSubmit">
                <input
                    v-model="search"
                    class="w-screen max-w-[150px] phone:max-w-[300px] tablet:max-w-[500px] px-2 outline-none rounded-lg shadow-md focus:shadow-sky-400 transition-shadow"
                    type="text"
                    placeholder="영화 검색"
                />
            </form>
        </div>
    </header>
</template>
