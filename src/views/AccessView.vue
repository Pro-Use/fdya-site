<template>
    <main id="main" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tight uppercase">
        <div class="grid p-8 grid-cols-3 gap-8 relative">
            <div class="col-span-2 pb-16">
                <h2 class="pb-8">ACCESSIBILITY</h2>
                <p class="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. Mauris vulputate sapien nec metus hendrerit, id venenatis libero vulputate.</p>
            </div>
            <h3 class="col-span-3 text-lg">Hide background images and heatmap:</h3>
            <button class="text-lg border-solid border border-white p-4 uppercase rounded-sm" @click="toggleBG">{{ backgroundsButtonText }} {{ backgroundsButtonState }}</button>
            <h3 class="col-span-3 text-lg pt-8">Pause animations:</h3>
            <button class="text-lg border-solid border border-white p-4 uppercase rounded-sm" @click="toggleAnimations">{{ animationsButtonText }} {{ animationsButtonState }}</button>
            <router-link class="absolute top-8 right-8 text-lg" to="/">
                <span class="sr-only">Back to Home Page</span>
			    <span aria-hidden="true">CLOSE</span>
            </router-link>
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
