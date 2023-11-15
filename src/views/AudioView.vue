<template>
    <main class="fixed w-screen h-screen h-fill-available top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tighter">
        <div class="w-full min-h-full flex items-center justify-center ">
            <router-link class="absolute top-8 right-8 text-lg xl:text-2xl hover:text-yellow" to="/">CLOSE</router-link>
            <div class="w-full max-w-4xl p-10">
            <h1 class="uppercase text-lg xl:text-2xl pb-10 ">Audio Guide</h1>
            <ul class="border-t border-white">
                <li v-for="page in state.accessInfoTranslated">
                    <button class="w-full text-left text-lg xl:text-2xl py-3 border-b border-white hover:text-yellow" aria-label="{{ page.accessible_description }}" @click="loadfile(page.audio_file)">
                        {{ page.title }}
                    </button>
                </li>
                <li class="pt-10">
                    <audio class="text-lg pt-4 w-full" ref="player" controls ></audio>
                </li>
            </ul>
            </div>
        </div>
   </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useStateStore } from '../stores/state'

const state = useStateStore()
const player = ref(null)
const api_base =  import.meta.env.VITE_API_BASE

const loadfile = ((source) => {
    if (player.value && source){
        player.value.pause()
        player.value.src = `${api_base}assets/${source.filename_disk}`
        player.value.play()
        // player.value.oncanplaythrough = () => {
        //     console.log(player.value.oncanplaythrough)
        //     player.value.play()
        // }
    }
})

onMounted(() => {
    state.interfaceVisible = false
})

onUnmounted(() => {
    state.interfaceVisible = true
})

</script>
