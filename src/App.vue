<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import BrowserInfo from './components/BrowserInfo.vue'
import BackgroundText from './components/BackgroundText.vue'
import ScreenSaver from './components/ScreenSaver.vue'
import Heatmap from './components/Heatmap.vue'
import Interface from './components/Interface.vue'
import FooterComponent from './components/FooterComponent.vue'
import { useStateStore } from './stores/state'

const state = useStateStore()
console.log(state)

const hm_div = ref(null)
const hm_data = ref(null)
</script>

<template>
  <section ref="hm_data" class="heatmap">
    <Transition name="fadeSlow">
      <Interface v-if="state.splashComplete"></Interface>
    </Transition>
    <Transition name="fadeSlow">
      <BrowserInfo v-if="!state.splashComplete" />
    </Transition>
    <BackgroundText />
    <Heatmap :monitored="hm_data" v-if="hm_data"/>
    <Transition name="fadeSlow">
      <template v-if="state.splashComplete">
        <RouterView/>
      </template>
    </Transition>
    <!-- <ScreenSaver :monitored="hm_data" v-if="state.splashComplete" /> -->
    <Transition name="fadeSlow">
      <FooterComponent  v-if="state.splashComplete"></FooterComponent>
    </Transition>
  </section>
</template>

<style scoped>
  body, html{
    padding: 0;
    margin: 0;
    width: 100vw;
    min-height:100vh;
  }
  .heatmap {
    width: 100vw;
    min-height:100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    /* mix-blend-mode: darken; */
  }

  /* Transitions */

  .fadeSlow-enter-active,
  .fadeSlow-leave-active {
    transition: opacity 3s ease;
  }

  .fadeSlow-enter-from,
  .fadeSlow-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

</style> 