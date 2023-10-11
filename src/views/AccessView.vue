<template>
    <main class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tight uppercase">
        <div class="grid p-8 grid-cols-3 gap-8 relative">
            <router-link class="absolute top-8 right-8" to="/">CLOSE</router-link>
            <div class="col-span-2 pb-16">
                <h2 class="pb-8">ACCESSIBILITY</h2>
                <p class="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. Mauris vulputate sapien nec metus hendrerit, id venenatis libero vulputate.</p>
            </div>
            <h3 class="col-span-3 text-lg">Hide background images and heatmap:</h3>
            <button class="text-lg border-solid border border-white p-4 uppercase rounded-sm" @click="toggleBG">{{ backgroundsButtonText }} {{ backgroundsButtonsState }}</button>
            <h3 class="col-span-3 text-lg pt-8">Pause animations:</h3>
            <button class="text-lg border-solid border border-white p-4 uppercase rounded-sm" @click="toggleAnimations">{{ animationsButtonText }} {{ animationsButtonsState }}</button>
            
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
        backgroundsButtonsState.value = "On"
    }else{
        backgroundsButtonsState.value = "off"
    }
})

const backgroundsButtonText = "Background Images"
const animationsButtonText = "Animations"
let backgroundsButtonsState = ref("on")
let animationsButtonsState =  ref("on")


function toggleBG(event){
    const button = event.target
    if(backgroundsButtonsState.value == "on"){
        backgroundsButtonsState.value = "off"
    }else{
        backgroundsButtonsState.value = "on"
    }
}

function toggleAnimations(event){
    const button = event.target
    if(animationsButtonsState.value == "on"){
        animationsButtonsState.value = "off"
    }else{
        animationsButtonsState.value = "on"
    }
}

</script>
