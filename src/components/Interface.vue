
<template>
    <header id="header" class="z-[100] font-DMregular">
        <!-- <h1 class="col-start-2 bg-white h-12 border-solid border border-blue shadow-default max-w-sm mx-auto leading-[44px] lg:fixed lg:top-8 lg:left-1/2 lg:translate-x-[-50%] lg:rounded-lg">
            <Vue3Marquee>
                <div class="px-1">{{title}} </div>
            </Vue3Marquee>
        </h1> -->
        <router-link 
            to="/info"
            class="
            fixed flex items-center justify-center top-2.5 left-2.5  z-[100] text-[#80BFF9] h-12 w-12 block 
            text-xs cursor-pointer hover:border-yellow hover:text-yellow 
            lg:top-5 lg:right-5 lg:left-auto lg:w-[80px] lg:h-[80px]
            ">
            <span class="sr-only">{{state.getTrans('about-the-exhibition')}}</span>
            <span class="absolute top-0.5 lg:top-1 left-0 w-full h-full flex items-center justify-center uppercase">{{state.getTrans('info')}}</span>
			<InfoIcon></InfoIcon>
        </router-link >
        <button
            @click="state.changeLang()"
            class="fixed top-2.5 right-2.5  z-[100] text-[#80BFF9] h-12 w-12 block text-xs cursor-pointer hover:text-yellow 
            lg:top-[110px] lg:right-5 lg:w-[80px] lg:h-[80px]
            ">
            <div class="relative">
                <span class="sr-only">{{ state.getTrans('change-language') }}</span>
                <span class="absolute top-0 left-0 w-full h-full flex items-center justify-center" aria-hidden="true">{{state.getTrans('language')}}</span>
                <LangIcon></LangIcon>
            </div>
        </button>
        <router-link 
            to="/audio"
            aria-label="Listen to an audio guide of the exhibition"
            class="
                fixed flex items-center justify-center bottom-2.5 left-2.5 z-[100] text-[#80BFF9] h-12 w-12 block text-xs cursor-pointer text-center
                lg:left-[initial] lg:right-5 lg:bottom-[200px] lg:w-[80px] lg:h-[80px]   
            ">
            <AudioIcon></AudioIcon>
        </router-link >
        <router-link 
            to="/accessibility"
            aria-label="Open Accessibility Options"
            class="
                fixed flex items-center justify-center bottom-2.5 right-2.5 z-[100] h-12 w-12 block text-xs cursor-pointer
                lg:right-5 lg:bottom-[110px] lg:w-[80px] lg:h-[80px]
            ">
            <AccessIcon></AccessIcon>
        </router-link>
        <button id="dl_button" @click="download_heatmap" :disabled="state.download_canvas"
            aria-label="Download the heatmap"
            class="
                fixed flex items-center justify-center bottom-2.5 right-[50%] translate-x-[50%] z-[100] h-12 w-12 block text-xs cursor-pointer
                lg:translate-x-[0] lg:right-5 lg:bottom-5 lg:w-[80px] lg:h-[80px]
            ">
            <span id="hm_download" v-if="dl_step != 0" class="fixed w-max lg:right-[100px] h-full flex items-center text-[#80BFF9] hover:border-yellow hover:text-yellow bg-black border-blue border-1 border pr-4 pl-4">
                {{state.getTrans('download-your-heatmap')}}
            </span>
            <DownloadIcon></DownloadIcon>
        </button>
    </header>
</template>


<script setup>

const title ='FOR DATA YOU ARE, AND TO DATA YOU SHALL RETURN 对于你所是的数据, 对于你应该返回的数据 '
import { ref } from 'vue'
import AudioIcon from './icons/AudioButton.vue';
import AccessIcon from './icons/AccessButton.vue';
import DownloadIcon from './icons/DownloadButton.vue';
import InfoIcon from './icons/InfoButton.vue'
import LangIcon from './icons/LanguageButton.vue'
import { useStateStore } from '../stores/state'

const state = useStateStore()
console.log(state.siteElsTranslated.language)

const dl_step = ref(0)

const download_listner = (event) => {
    if (event.target.closest('button') == null || event.target.closest('button').id !== 'dl_button'){
        dl_step.value = 0
        document.removeEventListener('click', download_listner)
    }
    
}

const download_heatmap = () => {
    dl_step.value ++
    if (dl_step.value == 1){
        document.addEventListener("click", download_listner)
            
    } else if (dl_step.value == 2){
        console.log('download_heatmap clicked')
        state.$patch({'download_heatmap': true})
        dl_step.value = 0
    }
    
}
</script>