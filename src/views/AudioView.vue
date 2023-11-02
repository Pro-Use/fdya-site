<template>
    <main class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tighter">
        <div class="w-screen h-screen flex items-center justify-center">
            <router-link class="absolute top-8 right-8 text-lg hover:text-yellow" to="/">CLOSE</router-link>

            <div>
                <ul>
                    <li v-for="page in state.accessInfoTranslated">
                        <button class="text-lg pb-4 hover:text-yellow" @click="loadfile(page.audio_file)">
                            {{ page.accessible_description }}
                        </button>
                    </li>
                    <li class="border-t-[1px] border-white pt-4">
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
