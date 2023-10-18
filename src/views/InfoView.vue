<template>
    <main id="main" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 font-DMregular leading-tighterer">
        <div class="grid-cols-modal lg:grid-cols-modal-xl grid gap-1">
            <div class="modal-body grid grid-cols-2 gap-16  p-2 lg:p-4 max-w-[1200px]">
                <div class="col-span-2">
                    <h2 class="pb-8 text-lg xl:text-2xl">FOR DATA YOU ARE, <br>AND TO DATA YOU SHALL RETURN</h2>
                    <div class="text-base xl:text-lg rte">
                        <p>For Data You Are, And To Data You Shall Return explores the nuance of current reflections around technological and bodily decay, renewal and existence in the digital domain and its environmental counterpart. </p>
                        <p>The online exhibition forms part of The Body, The Mind, The Soul programme ….</p>
                        <p>comprises works that span a range of digital media processes and outcomes; from hypnotic encounters with concealed code to custom software from the early nineties, and planetary-scale simulations, the exhibition presents expanded video practices, role-playing narratives and a reconnection with devices and their material origins, drawing links between communications across ethers. Reflecting on the idea of a transitional presence imbued within digitised works, the boundary between online and offline is negated: instead, the exhibition speaks to the circularity of these two ways of being through mediation of the screen and argues that one does not supersede the other.</p>
                    </div>
                    <button @click="readMore" v-if="!readMoreActive" class="mt-8 text-base border-solid border border-white p-6 py-1 uppercase rounded-sm hover:bg-white hover:text-black">
                        Read More
                    </button>
                    <div v-if="readMoreActive" class="text-base xl:text-lg rte">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. Mauris vulputate sapien nec metus hendrerit, id venenatis libero vulputate.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. Mauris vulputate sapien nec metus hendrerit, id venenatis libero vulputate.</p>
                    </div>
                </div>
                <div class="col-span-2">
                    <h3 class="text-lg xl:text-2xl pb-8 uppercase">List Of Works</h3>
                    <ul role="list" class="grid col-span-2 md:grid-cols-2 xl:grid-cols-3 gap-8 text-base xl:text-lg">
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
                <div class="col-span-2 md:col-span-1">
                    <h3 class="pb-8 text-lg  xl:text-2xl uppercase">AREBYTE</h3>
                    <p class="text-base xl:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. ero vulputate.
                    </p>
                </div>
                <div class="col-span-2 md:col-span-1">
                    <h3 class="pb-8 text-lg  xl:text-2xl uppercase">CHRONUS ART CENTER</h3>
                    <p class="text-base xl:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur iaculis porta. Etiam vel finibus diam. Quisque volutpat, arcu in maximus eleifend, lorem tellus commodo leo, sed condimentum elit massa vulputate est. Quisque id risus non urna dignissim feugiat. Aliquam erat volutpat. ero vulputate.
                    </p>
                </div>
                <div class="col-span-2">
                    <h3 class="pb-4 text-lg  xl:text-2xl uppercase">CREDITS</h3>
                    <ul role="list" class="text-base xl:text-lg">
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
            <div class="close-button">
                <router-link class="sticky p-2 lg:p-4 top-0 text-lg xl:text-2xl text-white text-right block w-full" to="/">
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
const readMoreActive = ref(false)

onMounted(() => {
    state.interfaceVisible = false
})
onUnmounted(() => {
    state.interfaceVisible = true
})

function readMore(){
    readMoreActive.value = !readMoreActive.value
}

</script>
