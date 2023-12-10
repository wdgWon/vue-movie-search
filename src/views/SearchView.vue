<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore, useMovieDetailStore } from '@/stores/movies';
import EllipsisLoading from '@/assets/EllipsisLoading.svg';
import MovieSearchLogo from '@/assets/MovieSearchLogo.svg';

const movieStore = useMovieStore();
const detailStore = useMovieDetailStore();
const router = useRouter();
const observer = ref(
    new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.isIntersecting && movieStore.loadMore();
        });
    })
);
const observeTarget = ref<HTMLElement | null>(null);

const handleOnClick = (movieId: string) => {
    detailStore.fetchMovieDetail(movieId, 'full');

    if (detailStore.isMovieDetail(movieId)) {
        router.push(`/detail/${movieId}`);
        return null;
    }

    watch(
        () => detailStore.isMovieDetail(movieId),
        () => router.push(`/detail/${movieId}`)
    );
};

watch(
    () => observeTarget.value,
    () => observeTarget.value && observer.value.observe(observeTarget.value)
);

onBeforeUnmount(() => {
    if (observer.value) {
        observer.value.disconnect();
    }
});
</script>

<template>
    <section class="relative w-screen h-fit">
        <div
            v-if="movieStore.isMovies"
            class="flex flex-col py-8"
        >
            <ul class="w-full flex flex-wrap gap-x-4 gap-y-16">
                <li
                    v-for="item in movieStore.movies.Search"
                    :key="item.imdbID"
                    class="inline-block grow min-w-fit shrink-0"
                >
                    <div
                        class="relative m-auto cursor-pointer w-[220px] aspect-[2/3] object-cover rounded-lg shadow-lgshadow-black hover:shadow-2xl hover:shadow-black transition-shadow overflow-hidden"
                        @click="handleOnClick(item.imdbID)"
                    >
                        <img
                            class="w-full h-full"
                            :src="item.Poster === 'N/A' ? MovieSearchLogo : item.Poster"
                            :alt="item.Title"
                        />
                        <div
                            class="absolute px-2 bottom-0 left-0 right-0 flex justify-center items-center aspect-[4/1] bg-gradient-to-t from-black to-transparent"
                        >
                            <span
                                class="inline-block text-white text-ellipsis whitespace-nowrap overflow-hidden"
                                >{{ item.Title }}</span
                            >
                        </div>
                    </div>
                </li>
            </ul>
            <div
                ref="observeTarget"
                class="pt-10 w-full"
            >
                <img
                    v-if="movieStore.movies.isMoreLoading"
                    class="w-32 h-32 m-auto"
                    :src="EllipsisLoading"
                    alt="More Loading"
                />
            </div>
        </div>
        <div
            v-else
            class="w-full py-10 text-center font-bold text-4xl text-slate-500"
        >
            검색 결과가 없습니다
        </div>
    </section>
</template>
