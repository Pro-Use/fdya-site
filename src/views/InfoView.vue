<template>
    <main class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tight">
        <div class="grid p-8 grid-cols-3 gap-8 relative">
            <router-link class="absolute top-8 right-8 text-lg" to="/">CLOSE</router-link>
            <div class="grid col-span-2 grid-cols-2 gap-24 pb-16 text-lg">
                <div class="col-span-2">
                    <h2 class="pb-8 uppercase">FOR DATA YOU ARE, <br>AND TO DATA YOU SHALL RETURN</h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. Mauris vulputate sapien nec metus hendrerit, id venenatis libero vulputate. <br><br>[READ MORE]
                </div>
                <div class="col-span-2">
                    <h3 class="text-lg pb-8 uppercase">List Of Works</h3>
                    <ul class="grid grid-cols-2 gap-8 text-lg">
                        <li> 
                            <i>Technological Grief Altar</i><br>
                            Alice Yuan Zhang<br>
                            2023<br>
                            [OPEN]
                        </li>
                        <li> 
                            <i>Digital Traces</i><br>
                            April Lin 林森<br>
                            2023<br>
                            [OPEN]
                        </li>
                        <li> 
                            <i>Dwellers between the waters</i><br>
                            Crosslucid<br>
                            2023<br>
                            [OPEN]
                        </li>
                        <li> 
                            <i>Symbiotic AI</i><br>
                            Iris QU<br>
                            2023<br>
                            [OPEN]
                        </li>
                        <li> 
                            <i>landscape / enter / life</i><br>
                            Rebecca Allen<br>
                            2023<br>
                            [OPEN]
                        </li>
                        <li> 
                            <i>Funeral Play</i><br>
                            Ruini Shi<br>
                            2023<br>
                            [OPEN]
                        </li>
                        <li> 
                            <i>Glimpse</i><br>
                            Crosslucid<br>
                            2023<br>
                            [OPEN]
                        </li>
                    </ul>
                </div>
                
                <div class="col-span-1 text-lg">
                    <h3 class="pb-4 uppercase">AREBYTE</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. ero vulputate.
                    </p>
                </div>
                <div class="col-span-1 text-lg">
                    <h3 class="pb-4 uppercase">CHRONUS ART CENTER</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. ero vulputate.
                    </p>
                </div>
                <div class="col-span-1 text-lg">
                    <h3 class="pb-4 uppercase">CREDITS</h3>
                    <ul>
                        <li class="pb-4">
                            <i>Integer Purus</i><br>
                            Praesent consequat
                        </li>
                        <li class="pb-4">
                            <i>Integer Purus</i><br>
                            Praesent consequat
                        </li>
                        <li class="pb-4">
                            <i>Integer Purus</i><br>
                            Praesent consequat
                        </li>
                        <li class="pb-4">
                            <i>Integer Purus</i><br>
                            Praesent consequat
                        </li>
                    </ul>
                </div>
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
})
onUnmounted(() => {
    state.interfaceVisible = true
})

</script>
