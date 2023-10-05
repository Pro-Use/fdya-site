<template>
	<div class="bg-text">
		{{ bg_text }}
	</div>
</template>

<script setup>
	import { ref } from 'vue'

	const bg_text = ref(' 51.46470, -0.05090 '.repeat(3000))
	
</script>

<style scoped>
.bg-text {
  color: #D06DFF;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  background-color: black;
  font-size: 10px;
  font-family: monospace;
}
</style>