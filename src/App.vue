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
    <Transition name="fadeSlow">
      <BrowserInfo v-if="!state.splashComplete" />
    </Transition>
    <BackgroundText />
    <div ref="hm_div" class="heatmap"></div>
    <Transition name="fade">
      <RouterView v-if="state.splashComplete"/>
    </Transition>
  </section>
</template>

<style scoped>
  body, html{
    padding: 0;
    margin: 0;
  }
  .heatmap {
    width: 100vw;
    height:100vh;
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