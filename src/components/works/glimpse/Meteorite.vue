<script setup lang="ts">
import { ref, reactive, onMounted, StyleValue } from 'vue'
import { Engine } from './engine/Engine.js';
import { World } from './world/index.js';

const emit = defineEmits<{
  (e: 'loaded'): void
}>();

const props = defineProps<{
  resource: {
    gltf: string
    normal: string
    environment: string
  }
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
let engine: Engine | null = null;

const styleObject: StyleValue = reactive({
  visibility: 'hidden' as const
})

onMounted(() => {
  if (canvas.value) {
    engine = new Engine({
      canvas: canvas.value,
      experience: World,
      onLoaded: () => emit('loaded'),
      resource: props.resource,
    });
  };
});

const start = () => { styleObject.visibility = 'visible'; engine?.start(); }
const pause = () => { engine?.pause(); }
const reset = () => { styleObject.visibility = 'hidden'; engine?.reset(); }

defineExpose({
  start,
  pause,
  reset,
});
</script>

<template>
  <canvas ref="canvas" class="container" :style="styleObject"></canvas>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
/*  pointer-events: none; */
}
</style>./world