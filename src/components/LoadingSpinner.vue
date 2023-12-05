<script setup lang="ts">
import Spinner from '@/assets/Spinner.svg';
</script>
<template>
    <div
        class="fixed top-0 w-screen h-screen bg-black/20 flex justify-center items-center z-50"
        @click.stop
    >
        <img
            class="opacity-80"
            :src="Spinner"
            alt="Loading Spinner"
        />
    </div>
</template>
