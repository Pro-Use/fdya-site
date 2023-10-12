<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, provide, onMounted } from 'vue';
import BrowserInfo from './components/BrowserInfo.vue'
import BackgroundText from './components/BackgroundText.vue'
import ScreenSaver from './components/works/ScreenSaver.vue'
import Heatmap from './components/Heatmap.vue'
import Interface from './components/Interface.vue'
import FooterComponent from './components/FooterComponent.vue'
import { useStateStore } from './stores/state'
import axios from 'axios';

const state = useStateStore()

const hm_data = ref(null)
const works_info = ref([])

const get_works_info = async () => {
  let res = await axios.get('http://data.fordatayouareandtodatayoushallreturn.online/items/works')
  const works = res.data.data

  state.$patch({'worksInfo': works})
}

onMounted(() => {
  get_works_info()
})





</script>

<template>
  <section ref="hm_data" class="heatmap">
    <Transition name="fade">
      <Interface v-if="state.splashComplete && state.interfaceVisible"></Interface>
    </Transition>
    <Transition name="fade">
      <BrowserInfo v-if="!state.splashComplete" />
    </Transition>
    <BackgroundText />
    <Heatmap :monitored="hm_data" v-if="hm_data && state.access_bg_images"/>
    <router-view v-slot="{ Component }">
      <transition :name="state.mainTransition">
        <component v-if="state.splashComplete" :is="Component" />
      </transition>
    </router-view>
    <!-- <ScreenSaver :monitored="hm_data" v-if="state.splashComplete" /> -->
    <Transition name="fade">
      <FooterComponent  v-if="state.splashComplete && state.interfaceVisible"></FooterComponent>
    </Transition>
  </section>
</template>

<style>
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

  .none-enter-active, .none-leave-active{
    transition: all 0s 0s linear;
  }

  .none-enter-from, .none-leave-to{
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .1s cubic-bezier(1, 0.5, 0.8, 1);;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transition: all .1s cubic-bezier(1, 0.5, 0.8, 1);;
  }



  .zoom-fade-enter-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .zoom-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .zoom-fade-enter-from,
  .zoom-fade-leave-to {
    transform: scale(1.1);
    opacity: 0;
  }


</style> 