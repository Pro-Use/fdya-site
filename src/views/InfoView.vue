<template>
    <main id="main" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 font-DMregular leading-tighterer">
        <div class="grid-cols-modal lg:grid-cols-modal-xl grid gap-1">
            <div class="modal-body grid grid-cols-2 gap-16  p-2 lg:p-4 max-w-[1200px]">
                <div class="col-span-2">
                    <h1 class="pb-8 text-lg xl:text-2xl">FOR DATA YOU ARE, <br>AND TO DATA YOU SHALL RETURN</h1>
                    <h2 class="sr-only">Introduction</h2>
                    <div class="text-base xl:text-lg rte" v-html="state.siteInfoTranslated.site_summary">
                    </div>
                    <button @click="readMore" v-if="!readMoreActive" class="mt-8 text-base border-solid border border-white p-6 py-1 uppercase rounded-sm hover:bg-white hover:text-black">
                        {{ state.getTrans('read-more') }}
                    </button>
                    <div v-if="readMoreActive" class="text-base xl:text-lg rte" v-html="state.siteInfoTranslated.site_info">
                    </div>
                </div>
                <div class="col-span-2">
                    <h2 class="text-lg xl:text-2xl pb-8 uppercase">List Of Works</h2>
                    <ul role="list" class="grid col-span-2 md:grid-cols-2 xl:grid-cols-3 gap-8 text-base xl:text-lg">
                        <li v-for="(work, index) in state.worksInfoTranslated" :key="index"> 
                            <div v-html="work.artist"></div>
                            <div v-html="work.listing"></div>
                            <router-link :to="state.workLinks[index]" :aria-label="'open ' + work.title + ' by ' + work.artist" class="hover:text-yellow">[OPEN]</router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-span-2 md:col-span-1">
                    <h2 class="pb-8 text-lg  xl:text-2xl uppercase">{{ state.getTrans('arebyte').toUpperCase() }}</h2>
                    <div class="text-base xl:text-lg rte" v-html="state.siteInfoTranslated.arebyte"></div>
                </div>
                <div class="col-span-2 md:col-span-1">
                    <h2 class="pb-8 text-lg  xl:text-2xl uppercase">{{ state.getTrans('chronus-art-center').toUpperCase() }}</h2>
                    <div class="text-base xl:text-lg rte" v-html="state.siteInfoTranslated.cac"></div>
                </div>
                <div class="col-span-2 md:col-span-1">
                    <h2 class="pb-4 text-lg  xl:text-2xl uppercase">{{ state.getTrans('events').toUpperCase() }}</h2>
                    <div class="text-base xl:text-lg rte" v-html="state.siteInfoTranslated.events"></div>
                </div>
                <div class="col-span-2 md:col-span-1">
                    <h2 class="pb-4 text-lg  xl:text-2xl uppercase">{{state.getTrans('credits').toUpperCase()}}</h2>
                    <div class="text-base xl:text-lg rte" v-html="state.siteInfoTranslated.credits"></div>
                </div>
                <div class="col-span-2">
                    <h2 class="sr-only">Partners</h2>
                    <div class="partner-logo-strip flex pt-[100px]">
                        <div class="flex items-center"> 
                            <img class="mr-8 w-[180px] h-auto" src="../assets/arebyte_logo_white.png" alt="Arebyte Gallery Logo"/>
                        </div>
                        <div class="flex items-center"> 
                            <img class="mr-6 w-[160px] h-auto" src="../assets/cac-logo.svg" alt="Chronos Art Centre Logo"/>
                        </div>
                        <div class="flex items-center"> 
                            <img class="mr-2 w-[200px] h-auto" src="../assets/grant_png_white.png" alt="Supported Using Public Funding by Arts Council England"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="close-button">
                <router-link class="sticky p-2 lg:p-4 top-0 text-lg xl:text-2xl text-white text-right block w-full hover:text-yellow" to="/">
                    <span class="sr-only">{{state.getTrans('back-to-home-page')}}</span>
                    <span aria-hidden="true">{{state.getTrans('close').toUpperCase()}}</span>
                </router-link>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue';
import { useStateStore } from '../stores/state'
import { useClStore } from '../stores/CrossLucid'

const state = useStateStore()
const cl_store = useClStore()
const readMoreActive = ref(false)

onMounted(() => {
    state.interfaceVisible = false
    cl_store.$patch({'aboutTextViewed': true})

})
onUnmounted(() => {
    state.interfaceVisible = true
})

function readMore(){
    readMoreActive.value = !readMoreActive.value
}

</script>
