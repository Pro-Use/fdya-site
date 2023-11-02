<script setup>
import { onMounted, onBeforeMount, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStateStore } from '../stores/state'

const router = useRouter()
const state = useStateStore()
const api_base =  import.meta.env.VITE_API_BASE
const indexMain = ref() 

const launchProject = (event) => {
  const a = event.target
  const container = a.parentElement
  const link = a.getAttribute('data-link')
  state.interfaceVisible = false

  if(state.access_animations == false){
    router.push({
        path: link
      })
  }
  if(container.classList.contains('active')){
    container.classList.remove('active')
  }else{
    container.classList.add('active')
  }
  container.addEventListener('transitionend', () => {
    state.mainTransition = 'none'
    
    setTimeout(() => {
      router.push({
        path: link
      })
    }, 1000)

  });
}

onBeforeMount(() => {
  let width = window.innerWidth;
  if (width < 768 && state.small_screen != 'viewed') {
    state.small_screen = 'true'
  }
})

onMounted(() => {
		state.interfaceVisible = true
    let height = window.innerHeight;
    if(indexMain.value.scrollHeight > height){
      indexMain.value.scrollTop = (indexMain.value.scrollHeight - height) / 2
    }
    console.log((indexMain.value.scrollHeight - height) / 2)
	})

const okaySmallScreen = (event) => {
  state.small_screen = 'viewed'
}

</script>

<template>
  <main id="main" aria-label="Index Page" ref="indexMain" class="fixed w-screen h-screen bg-transparent z-50 top-0 left-0 overflow-y-auto overscroll-contain">

  <div class="accessible-menu sr-only focus-within:not-sr-only border border-solid border-white rounded-lg focus-within:p-4 font-DMregular bg-black text-white">
    <h1 class="text-xl pb-8 uppercase">{{state.siteInfoTranslated.site_title}}</h1>
    <h2 class="text-lg pb-4">{{state.getTrans('introduction')}}</h2>
    <p class="pb-8">
      {{state.siteInfoTranslated.screenreader_introduction}}
    </p>
    <h2  class="text-lg pb-4" id="accessibleMenuTitle">{{state.getTrans('audio-accessible-menu')}}</h2>
    <nav>
      <ul role="list" aria-labelledby="accessibleMenuTitle">
        <li class="block" v-for="page in state.accessInfoTranslated">
          <RouterLink class="p-4 block focus:text-yellow" :to="'/access/'+ page.slug + '/' + state.siteLang">
            {{ page.accessible_description }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>


    <div aria-hidden="true" class="grid-container absolute top-0 w-screen">
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
    </div>
  
  <h2 class="sr-only" id="ArtworkListTitle">The Artworks</h2>
  <ul role="list" aria-labelledby="ArtworkListTitle">
    <li class="cross-container-7">
      <a :href="'#'+ state.worksInfo[0].title_en" @click="launchProject" :data-link="state.workLinks[0]" :aria-label="'Open '+ state.worksInfo[0].title_en + ' by ' + state.worksInfo[0].artist_en"> 
        <img 
          v-if="state.workCovers[0] !== null" 
          aria-hidden="true"
          class="absolute top-0 left-0 w-full h-full pointer-events-none object-cover" 
          :src="state.workCovers[0]">
      </a>
    </li>
    <li class="cross-container-8">
      <a :href="'#'+ state.worksInfo[1].title_en" @click="launchProject" :data-link="state.workLinks[1]" :aria-label="'Open '+ state.worksInfo[1].title_en + ' by ' + state.worksInfo[1].artist_en"> 
        <img 
        v-if="state.workCovers[1] !== null" 
        aria-hidden="true"
        class="absolute top-0 left-0 w-full h-full pointer-events-none object-cover" 
        :src="state.workCovers[1]">
      </a>
    </li>
    <li class="cross-container-9">
      <a :href="'#'+ state.worksInfo[2].title_en" @click="launchProject" :data-link="state.workLinks[2]" :aria-label="'Open '+ state.worksInfo[2].title_en + ' by ' + state.worksInfo[2].artist_en"> 
        <img 
        v-if="state.workCovers[2] !== null" 
        aria-hidden="true"
        class="absolute top-0 left-0 w-full h-full pointer-events-none object-cover" 
        :src="state.workCovers[2]">
      </a>
    </li>
    <li class="cross-container-10">
      <a :href="'#'+ state.worksInfo[3].title_en" @click="launchProject" :data-link="state.workLinks[3]" :aria-label="'Open '+ state.worksInfo[3].title_en + ' by ' + state.worksInfo[3].artist_en"> 
        <img 
          v-if="state.workCovers[3] !== null" 
          aria-hidden="true"
          class="absolute top-0 left-0 w-full h-full pointer-events-none object-cover" 
          :src="state.workCovers[3]">
      </a>
    </li>
    <li class="cross-container-11">
      <a :href="'#'+ state.worksInfo[4].title_en" @click="launchProject" :data-link="state.workLinks[4]" :aria-label="'Open '+ state.worksInfo[4].title_en + ' by ' + state.worksInfo[4].artist_en"> 
        <img 
          v-if="state.workCovers[4] !== null"
          aria-hidden="true"
          class="absolute top-0 left-0 w-full h-full pointer-events-none object-cover" 
          :src="state.workCovers[4]">
      </a>
    </li>
    <li class="cross-container-12">
      <a :href="'#'+ state.worksInfo[5].title_en" @click="launchProject" :data-link="state.workLinks[5]" :aria-label="'Open '+ state.worksInfo[5].title_en + ' by ' + state.worksInfo[5].artist_en"> 
        <img 
          v-if="state.workCovers[5] !== null" 
          aria-hidden="true"
          class="absolute top-0 left-0 w-full h-full pointer-events-none object-cover" 
          :src="state.workCovers[5]">
      </a>
    </li>
  </ul>

<!--   <template v-if="small_screen_alert">
  <Teleport to="body">
  <div aria-hidden="true" v-if="state.small_screen == 'true'" class="modal fixed w-screen h-screen top-0 left-0 bg-black text-white p-4 text-center flex items-center justify-center z-[100] font-DMregular">
    <div class="modal-inner">
      <h2 class="pb-8">MESSAGE</h2>
      <p class="pb-8">It looks like you are using a small screen to view this site. We recommend using a laptop or desktop computer for the best viewing experience as some artworks may not display correctly on this device.</p>
      <button @click="okaySmallScreen" class="text-white p-4 px-8 border border-1 border-solid border-white">Okay</button>
    </div>
  </div>
  </Teleport>
  </template> -->

  </main>
</template>

<style scoped lang="scss">



.grid-line-v{
    width: 1px;
    height: 100%;
    position: fixed;
    top:0;
    background-color: #2086E3;
    z-index: 1;
    transform: translateX(-50%);
  }

  .grid-line-v:nth-child(1){
    left: var(--x);
  }

  .grid-line-v:nth-child(2){
    left: calc(var(--x)*2);
  }

  .grid-line-v:nth-child(3){
    left: calc(var(--x)*3);
  }

  .grid-line-v:nth-child(4){
    left: calc(var(--x)*4);
  }

  .grid-line-v:nth-child(5){
    left: calc(var(--x)*5);
  }

  .grid-line-h{
    height: 1px;
    width: 100vw;
    position: absolute;
    left:0;
    background-color: #2086E3;
    z-index: 1;
    transform: translateY(-50%);
  }

  .grid-line-h:nth-child(6){
    top: .5px;
  }

  .grid-line-h:nth-child(7){
    top: calc(var(--x)*1);
  }

  .grid-line-h:nth-child(8){
    top:calc(var(--x)*2);
  }

  .grid-line-h:nth-child(9){
    top: calc(var(--x)*3);
  }

  .grid-line-h:nth-child(10){
    top: calc(var(--x)*4);
  }

  .grid-line-h:nth-child(11){
    top:calc(var(--x)*5);
    display: none;
  }

  .grid-line-h:nth-child(12){
    top: calc(var(--x)*6);
    display: none;
  }


  svg{
    position: absolute;
    top: 150%;
    left: 50%;
    width: 500px;
    transform: translate(-50%,-50%);
  }
  .cross-container{
    top: var(--x);
    left: calc(var(--x)*1);

    /* border: 1px solid red; */
  }

  [class^="cross-container"]{
    position: absolute;
    display: block;
    width: calc(var(--x)*2);
    height: calc(var(--x)*2);
    cursor: pointer;
    transition: 
      all 300ms 0ms ease-in-out;
    transform: translate(-50%,-50%) scale(25%);
    z-index: 2;
    img{
      opacity: 0;
      transition: all 300ms 0ms ease-in-out;
    }
  }
  
  [class^="cross-container"]:hover, [class^="cross-container"]:focus-within{
    transform:translate(-50%,-50%) scale(100%, 100%);
    z-index: 100;
    img{
      opacity: 1;
    }
  }

  [class^="cross-container"] a{
    display: block;
    width: 100%;
    height: 100%;
    background-color: #BCFF2F;
    /* background: url('LEL2.png'); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    transform: rotate(90deg);
    transition: 
      transform 300ms 100ms ease-in-out,
      clip-path 300ms 300ms ease-in-out;
    clip-path: polygon(0 49%, 49% 49%, 49% 0, 51% 0, 51% 49%, 100% 49%, 100% 51%, 51% 51%, 51% 100%, 49% 100%, 49% 51%, 0 51%);  
  }

  [class^="cross-container"].active{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    transform:translate(-50%,-50%) scale(100%, 100%);
    z-index: 1000;
    a{
      transform: rotate(0);
      clip-path: polygon(0% 15%, 0 0, 15% 0%, 85% 0%, 100% 0, 100% 15%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%) !important ;
      transition: clip-path 300ms 300ms ease-in-out;
    }
    img{
      opacity: 1;
    }
  }


  .cross-container-7{
    top: calc(var(--x)*1);
    left: calc(var(--x)*2);
  }
  .cross-container-7:hover{
    transform:translate(-50%,-50%) scale(100%, 100%);
  }
  .cross-container-7:hover a, .cross-container-7 a:focus{
   /* transform: rotate(90deg); */
 transform: rotate(0deg);
    clip-path: polygon(0 25%, 25% 25%, 25% 0, 85% 0%, 100% 0, 100% 15%, 100% 85%, 100% 100%, 85% 100%, 25% 100%, 25% 75%, 0 75%);
  }


  .cross-container-8{
    top: calc(var(--x)*2);
    left: calc(var(--x)*3);
  }
  .cross-container-8:hover{
    transform:translate(-50%,-50%) scale(100%, 100%);
  }
  .cross-container-8:hover a, .cross-container-8 a:focus{
   /* transform: rotate(90deg); */
 transform: rotate(0deg);
    clip-path: polygon(0 25%, 0 0, 25% 0, 75% 0, 75% 26%, 100% 26%, 100% 75%, 100% 100%, 75% 100%, 25% 100%, 25% 75%, 0 75%);
  }

  .cross-container-9{
    top: calc(var(--x)*1);
    left: calc(var(--x)*4);
  }
  .cross-container-9:hover{
    transform:translate(-50%,-50%) scale(100%, 100%);
  }
  .cross-container-9:hover a, .cross-container-9 a:focus{
   /* transform: rotate(90deg); */
 transform: rotate(0deg);
    clip-path: polygon(0 25%, 25% 25%, 25% 0, 75% 0, 75% 25%, 100% 25%, 100% 75%, 100% 100%, 75% 100%, 25% 100%, 25% 75%, 0 75%);
  }


  .cross-container-10{
    top: calc(var(--x)*2);
    left: calc(var(--x)*5);
  }
  .cross-container-10:hover{
    transform:translate(-50%,-50%) scale(100%, 100%);
  }
  .cross-container-10:hover a, .cross-container-10 a:focus{
   /* transform: rotate(90deg); */
 transform: rotate(0deg);
    clip-path: polygon(0 25%, 0 0, 25% 0, 75% 0, 100% 0, 100% 26%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0 75%);
  }


  .cross-container-11{
    top: calc(var(--x)*3);
    left: calc(var(--x)*1);
  }
  .cross-container-11:hover{
    transform:translate(-50%,-50%) scale(100%, 100%);
  }
  .cross-container-11:hover a, .cross-container-11 a:focus{
   /* transform: rotate(90deg); */
 transform: rotate(0deg);
    clip-path: polygon(0 25%, 25% 25%, 25% 0, 75% 0, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0 75%);  
  }

  .cross-container-12{
    top: calc(var(--x)*3);
    left: calc(var(--x)*4);
  }
  .cross-container-12:hover{
    transform:translate(-50%,-50%) scale(100%, 100%);
  }
  .cross-container-12:hover a, .cross-container-12 a:focus{
   /* transform: rotate(90deg); */
 transform: rotate(0deg);
    clip-path: polygon(0 25%, 25% 25%, 25% 0, 75% 0, 75% 26%, 100% 26%, 100% 75%, 100% 100%, 75% 100%, 25% 100%, 25% 75%, 0 75%);  
  }



@media screen and (orientation: portrait) {
  .grid-line-v:nth-child(1){
    left: var(--x);
    display: block;
  }
  .grid-line-v:nth-child(2){
    left: calc(var(--x)*2);
    display: block;
  }

  .grid-line-v{
    display: none;
  }  

  .cross-container-7{
    top: calc(var(--x)*1);
    left: calc(var(--x)*1);
  }
  .cross-container-8{
    top: calc(var(--x)*1);
    left: calc(var(--x)*2);
  }
  .cross-container-9{
    top: calc(var(--x)*2);
    left: calc(var(--x)*2);
  }
  .cross-container-10{
    top: calc(var(--x)*3);
    left: calc(var(--x)*1);
  }
  .cross-container-11{
    top: calc(var(--x)*4);
    left: calc(var(--x)*2);
  }
  .cross-container-12{
    top: calc(var(--x)*5);
    left: calc(var(--x)*1);
  }

  .grid-line-h:nth-child(11), .grid-line-h:nth-child(12){
    display: block;
  }
}

.notransition [class^="cross-container"], .notransition a, .notransition img {
    transition: all 0s 1ms linear !important;
  }



  [data-intent='keyboard'] {
    
  }

  .accessible-menu:focus-within{
      position: fixed;
          top: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 500;
    }

</style>