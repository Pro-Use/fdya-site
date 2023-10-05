<script setup>

</script>

<template>
  <main class="fixed w-screen h-screen bg-transparent z-50 top-0 left-0 overflow-y-auto ">
    <div class="grid-container absolute top-0 h-screen w-screen">
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
      <div class="grid-line-v"></div>
    </div>
    <div class="grid-container absolute top-0">
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
      <div class="grid-line-h"></div>
    </div>
    
  </main>
</template>

<style scoped>

.grid-container{

}

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

</style>