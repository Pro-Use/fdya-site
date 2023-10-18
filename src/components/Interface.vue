
<template>
    <header id="header" class="z-[100] font-DMregular">
        <!-- <h1 class="col-start-2 bg-white h-12 border-solid border border-black shadow-default max-w-sm mx-auto leading-[44px] lg:fixed lg:top-8 lg:left-1/2 lg:translate-x-[-50%] lg:rounded-lg">
            <Vue3Marquee>
                <div class="px-1">{{title}} </div>
            </Vue3Marquee>
        </h1> -->
        <router-link 
            to="/info"
            class="
            fixed flex items-center justify-center top-2.5 left-2.5  z-[100] bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow
            lg:top-8 lg:right-8 lg:left-auto lg:w-[96px] lg:rounded-lg
            ">
            <span class="sr-only">About the exhibition</span>
			<span aria-hidden="true">INFO</span>
        </router-link >
        <button
            class="fixed top-2.5 right-2.5  z-[100] bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow 
            lg:top-[96px] lg:right-8 lg:w-[96px] lg:rounded-lg
            ">
            <span class="sr-only">Change Language</span>
			<span aria-hidden="true">中文</span>
        </button>
        <router-link 
            to="/audio"
            aria-label="Listen to an audio guide of the exhibition"
            class="
                fixed flex items-center justify-center bottom-2.5 left-2.5 z-[100] bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow text-center
                lg:left-[initial] lg:right-8 lg:bottom-48 lg:w-[96px] lg:rounded-[50%]    
            ">
            <AudioIcon></AudioIcon>
        </router-link >
        <router-link 
            to="/accessibility"
            aria-label="Open Accessibility Options"
            class="
                fixed flex items-center justify-center bottom-2.5 right-2.5 z-[100] bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow
                lg:right-8 lg:bottom-28 lg:w-[96px] lg:rounded-[50%] lg:bg-transparent lg:border-none lg:shadow-none lg:hover:bg-transparent lg:hover:border-solid lg:hover:border lg:hover:border-white
            ">
            <AccessIcon></AccessIcon>
        </router-link>
        <button @click="download_heatmap" :disabled="state.download_canvas"
            aria-label="Download the heatmap"
            class="
                fixed flex items-center justify-center bottom-2.5 right-2.5 z-[100] bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow
                lg:right-8 lg:bottom-8 lg:w-[96px] lg:rounded-[50%] lg:bg-transparent lg:border-none lg:shadow-none lg:hover:bg-transparent lg:hover:border-solid lg:hover:border lg:hover:border-white
            ">
            <DownloadIcon></DownloadIcon>
        </button>
    </header>
</template>


<script setup>

const title ='FOR DATA YOU ARE, AND TO DATA YOU SHALL RETURN 对于你所是的数据, 对于你应该返回的数据 '
import AudioIcon from './icons/AudioIcon.vue';
import AccessIcon from './icons/AccessIcon.vue';
import DownloadIcon from './icons/DownloadIcon.vue';
import { useStateStore } from '../stores/state'

const state = useStateStore()
// const { download_canvas } = storeToRefs(state)

const download_heatmap = () => {
    console.log('download_heatmap clicked')
    state.$patch({'download_heatmap': true})
}
</script>