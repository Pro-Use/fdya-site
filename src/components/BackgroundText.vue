<template>
	<div class="bg-text">
		{{ bg_text }}
	</div>
</template>

<script setup>
	import { ref } from 'vue'

	const bg_text = ref('test '.repeat(9999))
	
</script>

<style scoped>
.bg-text {
  color: fuchsia;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
}
</style>