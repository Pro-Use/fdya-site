<template>
    <footer class="z-[100] font-DMregular">
        <router-link 
            to="/audio"
            aria-label="Listen to an audio guide of the exhibition"
            class="
                fixed flex items-center justify-center bottom-2.5 left-2.5 z-[100] bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow text-center
                lg:left-[initial] lg:right-8 lg:bottom-[96px] lg:w-[96px] lg:rounded-[50%]    
            ">
            <AudioIcon></AudioIcon>
        </router-link >
        <router-link 
            to="/accessibility"
            aria-label="Open Accessibility Options"
            class="
                fixed flex items-center justify-center bottom-2.5 right-2.5 z-[100] bg-white h-12 w-12 block border-solid border border-black rounded-full shadow-default text-xs cursor-pointer hover:bg-yellow
                lg:right-8 lg:bottom-8 lg:w-[96px] lg:rounded-[50%] lg:bg-transparent lg:border-none lg:shadow-none lg:hover:bg-transparent lg:hover:border-solid lg:hover:border lg:hover:border-white
            ">
            <AccessIcon></AccessIcon>
        </router-link>
</footer>
</template>

<script setup>
import AudioIcon from './icons/AudioIcon.vue';
import AccessIcon from './icons/AccessIcon.vue';
</script>