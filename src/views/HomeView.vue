<script setup>

</script>

<template>
  <main class="fixed w-screen h-screen bg-transparent z-50 top-0 left-0 overflow-y-auto">

    <div class="grid-container absolute top-0 min-h-screen w-screen">
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
    </div>

    <div class="grid-container absolute top-0 min-h-screen w-screen">
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
    </div>

    <div class="cross-container-7"><a> </a></div>
    <div class="cross-container-8"><a> </a></div>
    <div class="cross-container-9"><a> </a></div>
    <div class="cross-container-10"><a> </a></div>
    <div class="cross-container-11"><a> </a></div>
    <div class="cross-container-12"><a> </a></div>

  </main>
</template>

<style scoped>


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

  .grid-line-h:nth-child(1){
    top: var(--x);
  }

  .grid-line-h:nth-child(2){
    top: calc(var(--x)*2);
  }

  .grid-line-h:nth-child(3){
    top:calc(var(--x)*3);
  }

  .grid-line-h:nth-child(4){
    top: calc(var(--x)*4);
  }

  .grid-line-h:nth-child(5){
    top: calc(var(--x)*5);
  }

  .grid-line-h:nth-child(6){
    top:calc(var(--x)*6);
  }

  .grid-line-h:nth-child(7){
    top: calc(var(--x)*7);
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
      transform 300ms 0ms ease-in-out;
    transform: translate(-50%,-50%) scale(25%);
    z-index: 2;
  }
  
  [class^="cross-container"]:hover{
    transform:translate(-50%,-50%) scale(100%, 50%);
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

  [class^="cross-container"]:hover a{
    /* background: url('LEL2.png'); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
  }


  .cross-container-7{
    top: calc(var(--x)*1);
    left: calc(var(--x)*2);
  }
  .cross-container-7:hover{
    transform:translate(-50%,-50%) scale(100%, 100%);
  }
  .cross-container-7:hover a{
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
  .cross-container-8:hover a{
   /* transform: rotate(90deg); */
 transform: rotate(0deg);
    clip-path: polygon(0 25%, 0 0, 25% 0, 75% 0, 75% 26%, 100% 26%, 100% 75%, 100% 100%, 75% 100%, 25% 100%, 25% 75%, 0 75%);
  }

  .cross-container-9{
    top: calc(var(--x)*1);
    left: calc(var(--x)*34);
  }
  .cross-container-9:hover{
    transform:translate(-50%,-50%) scale(100%, 100%);
  }
  .cross-container-9:hover a{
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
  .cross-container-10:hover a{
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
  .cross-container-11:hover a{
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
  .cross-container-12:hover a{
   /* transform: rotate(90deg); */
 transform: rotate(0deg);
    clip-path: polygon(0 25%, 25% 25%, 25% 0, 75% 0, 75% 26%, 100% 26%, 100% 75%, 100% 100%, 75% 100%, 25% 100%, 25% 75%, 0 75%);  
  }


</style>