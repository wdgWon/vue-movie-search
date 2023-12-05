<script setup lang="ts">
import { watch, computed } from 'vue';
import { useMovieDetailStore } from '@/stores/movies';
import { useRoute } from 'vue-router';

const {
    params: { movieId },
} = useRoute();
const detailStore = useMovieDetailStore();
const movie = computed(() => detailStore.getMovieDetail(movieId as string));

detailStore.fetchMovieDetail(movieId as string);

watch(
    () => movieId,
    (currentId) => {
        detailStore.fetchMovieDetail(currentId as string);
    }
);
</script>

<template>
    <section
        v-if="detailStore.isMovieDetail(movieId as string)"
        class="w-full h-full flex justify-center items-center gap-8"
    >
        <img
            :src="movie.Poster"
            :alt="movie.Title"
        />
        <div class="flex flex-col gap-4">
            <span>제목 : {{ movie.Title }}</span>
            <span>장르 : {{ movie.Genre }}</span>
            <span>평점 : {{ movie.Metascore }}</span>
            <span>줄거리 : {{ movie.Plot }}</span>
        </div>
    </section>
    <div
        v-else
        class="w-full py-10 text-center font-bold text-4xl text-slate-500"
    >
        검색 결과가 없습니다
    </div>
</template>
