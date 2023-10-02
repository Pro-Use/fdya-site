<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import BrowserInfo from './components/BrowserInfo.vue'
import BackgroundText from './components/BackgroundText.vue'
import Heatmap from './components/Heatmap.vue'
import { useStateStore } from './stores/state'

const state = useStateStore()
console.log(state)

const hm_div = ref(null)
const hm_data = ref(null)
</script>

<template>
  <section ref="hm_data" class="heatmap">
    <header>
    </header>
    <BackgroundText />
    <Heatmap :monitored="hm_data" v-if="hm_data"/>
    <BrowserInfo v-show="!state.splashComplete"/>
    <RouterView />
  </section>
</template>

<style scoped>
  .heatmap {
    width: 100vw;
    height:100vh;
    position: fixed;
    top: 0;
  }
</style>
