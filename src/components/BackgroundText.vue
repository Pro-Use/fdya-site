<template>
	<div class="bg-text p-8">
		<div class="grid grid-cols-3 gap-3">
			<div>{{state.browserInfo}}</div>
			<div>{{state.hmData}}</div>
			<div>3</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStateStore } from '../stores/state'

	const state = useStateStore()
	
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