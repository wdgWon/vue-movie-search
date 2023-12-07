<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movies';
import MovieSearchLogo from '@/assets/MovieSearchLogo.svg';

const router = useRouter();
const movieStore = useMovieStore();
const search = ref('');
const open = ref(false);

const handleOnSubmit = () => {
    movieStore.fetchMovies(search.value);
    open.value = !open.value;
};

watch(
    [() => movieStore.movies.isLoading, open],
    ([stillLoading]) => stillLoading === false && router.push('/search')
);
</script>
<template>
    <div class="w-screen h-screen flex flex-col justify-center items-center gap-24">
        <div class="relative w-64 h-64">
            <div
                id="top"
                class="w-full flex justify-center items-center absolute -top-16 diagonal-stripes transform -rotate-45 origin-bottom-left rounded-md aspect-[4/1]"
                :class="{ 'rotate-0': open }"
            >
                <img
                    class="absolute -top-20 bg-white"
                    :src="MovieSearchLogo"
                    alt="Movie Search Logo"
                />
            </div>
            <div
                id="bottom"
                class="w-full absolute top-0 diagonal-stripes rounded-md aspect-[4/1]"
            ></div>
            <form
                id="slate"
                class="w-full p-2 flex justify-center items-center bg-gray-800 rounded-md overflow-hidden aspect-square"
                @submit.prevent="handleOnSubmit"
            >
                <input
                    v-model="search"
                    class="w-full bg-inherit border-y-2 py-4 outline-none border-white text-center font-bold text-2xl text-white caret-white"
                    type="text"
                    placeholder="영화를 검색해주세요"
                    autofocus
                />
            </form>
        </div>
    </div>
</template>

<style scoped>
#slate {
    transition: background-color 0.3s ease;
}
#top,
#bottom {
    transition: transform 0.3s ease;
}
.diagonal-stripes {
    background: repeating-linear-gradient(45deg, #ffffff, #ffffff 20px, #000000 20px, #000000 40px);
}
</style>
