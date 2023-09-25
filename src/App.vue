<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import BrowserInfo from './components/BrowserInfo.vue'
import BackgroundText from './components/BackgroundText.vue'
import { useStateStore } from './stores/state'

const state = useStateStore()
console.log(state)

const hm_div = ref(null)
</script>

<template>
  <section v-heatmap:map="hm_div" class="heatmap">
    <header>
    </header>
    <BackgroundText />
    <div ref="hm_div" class="heatmap" v-if="state.splashComplete"></div>
    <div class="fake-heatmap" v-else></div>
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

  .fake-heatmap{
    width: 100vw;
    height:100vh;
    position: fixed;
    top: 0;
    background-color: DarkMagenta;
  }
</style>
