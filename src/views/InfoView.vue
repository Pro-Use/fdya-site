<template>
    <main id="main" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tight">
        <div class="grid p-8 grid-cols-3 gap-8 relative">
            <div class="grid col-span-2 grid-cols-2 gap-24 pb-16 text-lg">
                <div class="col-span-2">
                    <h2 class="pb-8 uppercase">FOR DATA YOU ARE, <br>AND TO DATA YOU SHALL RETURN</h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. Mauris vulputate sapien nec metus hendrerit, id venenatis libero vulputate. <br><br>[READ MORE]
                </div>
                <div class="col-span-2">
                    <h3 class="text-lg pb-8 uppercase">List Of Works</h3>
                    <ul role="list" class="grid grid-cols-2 gap-8 text-lg">
                        <li> 
                            <i class="block">Technological Grief Altar</i>
                            <p>Alice Yuan Zhang</p>
                            <p>2023</p>
                            <router-link :to="state.workLinks[3]">[OPEN]</router-link>
                        </li>
                        <li> 
                            <i>Digital Traces</i><br>
                            <p>April Lin 林森</p>
                            <p>2023</p>
                            <router-link :to="state.workLinks[5]">[OPEN]</router-link>
                        </li>
                        <li> 
                            <i class="block">Dwellers between the waters</i>
                            <p>Crosslucid</p>
                            <p>2023</p>
                            <router-link :to="state.workLinks[1]">[OPEN]</router-link>
                        </li>
                        <li> 
                            <i class="block">Symbiotic AI</i>
                            <p>Iris QU</p>
                            <p>2023</p>
                            <router-link :to="state.workLinks[0]">[OPEN]</router-link>
                        </li>
                        <li> 
                            <i class="block">landscape / enter / life</i>
                            <p>Rebecca Allen</p>
                            <p>2023</p>
                            <router-link :to="state.workLinks[2]">[OPEN]</router-link>
                        </li>
                        <li> 
                            <i class="block">Funeral Play</i>
                            <p>Ruini Shi</p>
                            <p>2023</p>
                            <router-link :to="state.workLinks[4]">[OPEN]</router-link>
                        </li>
                        <li> 
                            <i class="block">Glimpse</i>
                            <p>Xu Haomin</p>
                            <p>2023</p>
                            <router-link :to="state.workLinks[6]">[OPEN]</router-link>
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
                    <ul role="list">
                        <li class="pb-4">
                            <i class="block">Integer Purus</i>
                            Praesent consequat
                        </li>
                        <li class="pb-4">
                            <i class="block">Integer Purus</i>
                            Praesent consequat
                        </li>
                        <li class="pb-4">
                            <i class="block">Integer Purus</i>
                            Praesent consequat
                        </li>
                        <li class="pb-4">
                            <i class="block">Integer Purus</i>
                            Praesent consequat
                        </li>
                    </ul>
                </div>
            </div>
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
})
onUnmounted(() => {
    state.interfaceVisible = true
})

</script>
