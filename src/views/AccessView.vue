<template>
    <main id="main" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 font-DMregular leading-tighter">
        <div class="grid-cols-modal xl:grid-cols-modal-xl grid gap-1">
            <div class="modal-body grid grid-cols-2 gap-16 p-2 lg:p-4 max-w-[1200px]">
                <div class="col-span-2">
                    <h2 class="pb-8 text-lg xl:text-2xl">ACCESSIBILITY</h2>
                    <p class="text-base xl:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. Mauris vulputate sapien nec metus hendrerit, id venenatis libero vulputate.</p>
                </div>
                <div class="col-span-2">
                    <h3 class="text-lg xl:text-2xl pt-8 pb-4 uppercase">Hide background images and heatmap:</h3>
                    <button class="w-full max-w-md text-base border-solid border border-white p-4 uppercase rounded-sm" @click="toggleBG">{{ backgroundsButtonText }} {{ backgroundsButtonState }}</button>
                </div>
                <div class="col-span-2">
                    <h3 class="text-lg xl:text-2xl pt-8 pb-4 uppercase">Pause animations:</h3>
                    <button class="w-full max-w-md text-base border-solid border border-white p-4 uppercase rounded-sm" @click="toggleAnimations">{{ animationsButtonText }} {{ animationsButtonState }}</button>
                </div>    
            </div>
            <div class="close-button">
                <router-link class="sticky top-0  p-2 lg:p-4 text-lg xl:text-2xl text-white text-right w-full block" to="/">
                    <span class="sr-only">Back to Home Page</span>
                    <span aria-hidden="true">CLOSE</span>
                </router-link>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue';
import { useStateStore } from '../stores/state'

const state = useStateStore()

onMounted(() => {
    state.interfaceVisible = false
    if(state.access_bg_images == true){
        backgroundsButtonState.value = "On"
    }else{
        backgroundsButtonState.value = "off"
    }
})

const backgroundsButtonText = "Background Images"
const animationsButtonText = "Animations"
let backgroundsButtonState = ref("on")
let animationsButtonState =  ref("on")


function toggleBG(event){
    const button = event.target
    state.access_bg_images = !state.access_bg_images
    if(backgroundsButtonState.value == "on"){
        backgroundsButtonState.value = "off"
    }else{
        backgroundsButtonState.value = "on"
    }
}

function toggleAnimations(event){
    const button = event.target
    state.access_animations = !state.access_animations
    if(animationsButtonState.value == "on"){
        animationsButtonState.value = "off"
    }else{
        animationsButtonState.value = "on"
    }
}

</script>
