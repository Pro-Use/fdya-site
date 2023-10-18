<template>
    <main class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tighter">
        <div class="w-screen h-screen flex items-center justify-center">
            <router-link class="absolute top-8 right-8 text-lg hover:text-yellow" to="/">CLOSE</router-link>
            <figure>
                <figcaption class="sr-only">Listen to the audio guide:</figcaption>
                <audio controls autoplay src="/audio-guide-test.mp3">
                </audio>
            </figure>
        </div>
   </main>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue';
import { useStateStore } from '../stores/state'

const state = useStateStore()

onMounted(() => {
    state.interfaceVisible = false
})
onUnmounted(() => {
    state.interfaceVisible = true
})

</script>
