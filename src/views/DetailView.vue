<script setup lang="ts">
import { watch, computed } from 'vue';
import { useMovieDetailStore } from '@/stores/movies';
import { useRoute } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const { movieId } = useRoute().params;
const detailStore = useMovieDetailStore();
const movie = computed(() => detailStore.getMovieDetail(movieId as string));

watch(() => movieId, (currentId) => {
    detailStore.fetchMovieDetail(currentId as string);
});

</script>

<template>
    <section
        v-if="detailStore.isLoading === false && detailStore.isMovieDetail(movieId as string)"
        class="container"
    >
        <img
            :src="movie.Poster"
            :alt="movie.Title"
        />
        <div class="contents">
            <span>제목 : {{ movie.Title }}</span>
            <span>장르 : {{ movie.Genre }}</span>
            <span>평점 : {{ movie.Metascore }}</span>
            <span>줄거리 : {{ movie.Plot }}</span>
        </div>
    </section>
    <LoadingSpinner v-else-if="detailStore.isLoading === true" />
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .contents {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}
</style>
