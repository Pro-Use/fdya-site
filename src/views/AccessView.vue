<template>
    <main id="main" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 font-DMregular leading-tighter">
        <div class="grid-cols-modal xl:grid-cols-modal-xl grid gap-1">
            <div class="modal-body grid grid-cols-2 gap-16 p-2 lg:p-4 max-w-[1200px]">
                <div class="col-span-2">
                    <h2 class="pb-8 text-lg xl:text-2xl">{{state.getTrans('accessibility').toUpperCase()}}</h2>
                    <p class="text-base xl:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. Mauris vulputate sapien nec metus hendrerit, id venenatis libero vulputate.</p>
                </div>
                <div class="col-span-2">
                    <h3 class="text-lg xl:text-2xl pt-8 pb-4 uppercase">{{state.getTrans('hide-background-images-and-heatmap')}}:</h3>
                    <button 
                        class="w-full max-w-md text-base border-solid border border-white p-4 uppercase rounded-sm hover:text-black hover:bg-white" 
                        @click="toggleBG"
                        :aria-label="backgroundsButtonLabel"
                        >{{ backgroundsButtonText }}
                    </button>
                </div>
                <div class="col-span-2">
                    <h3 class="text-lg xl:text-2xl pt-8 pb-4 uppercase">{{state.getTrans('pause-animations')}}:</h3>
                    <button 
                        class="w-full max-w-md text-base border-solid border border-white p-4 uppercase rounded-sm hover:text-black hover:bg-white" 
                        @click="toggleAnimations"
                        :aria-label="animationsButtonLabel"
                        >{{ animationsButtonText }}
                    </button>
                </div>    
            </div>
            <div class="close-button">
                <router-link class="sticky top-0  p-2 lg:p-4 text-lg xl:text-2xl text-white text-right w-full block hover:text-yellow" to="/">
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

const state = useStateStore()

onMounted(() => {
    state.interfaceVisible = false
    setButtonText()
})

const buttonTextJson = {
    "bgImagesOnButtonText": "Turn Background Images Off",
    "bgImagesOffButtonText": "Turn Background Images On",
    "bgImagesOffLabelText": "Background Images are off, click to turn background images on",
    "bgImagesOnLabelText": "Background Images are on, click to turn background images off",
    "animationsOnButtonText": "Turn Animations Off",
    "animationsOffButtonText": "Turn Animations On",
    "animationsOffLabelText": "Animations are off, click to turn Animations on",
    "animationsOnLabelText": "Animations are on, click to turn Animations off"
}


const backgroundsButtonText = ref()
const animationsButtonText = ref()
const backgroundsButtonLabel = ref()
const animationsButtonLabel = ref()


function toggleBG(event){
    const button = event.target
    state.access_bg_images = !state.access_bg_images
    setButtonText()
}

function setButtonText(){
    if(state.access_bg_images == true){
        backgroundsButtonText.value = buttonTextJson.bgImagesOnButtonText
        backgroundsButtonLabel.value =  buttonTextJson.bgImagesOnLabelText
    }else{
        backgroundsButtonText.value = buttonTextJson.bgImagesOffButtonText
        backgroundsButtonLabel.value =  buttonTextJson.bgImagesOffLabelText
    }
    if(state.access_animations == true){
        animationsButtonText.value = buttonTextJson.animationsOnButtonText
        animationsButtonLabel.value =  buttonTextJson.animationsOnLabelText
    }else{
        animationsButtonText.value =    buttonTextJson.animationsOffButtonText
        animationsButtonLabel.value =  buttonTextJson.animationsOffLabelText
    }
}

function toggleAnimations(event){
    const button = event.target
    state.access_animations = !state.access_animations
    setButtonText()
}

</script>
