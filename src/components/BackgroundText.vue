<template>
	<div aria-hidden="true" class="bg-text h-screen w-screen">
		<div class="grid grid-cols-3">
			<div class="p-4 h-screen overflow-y-auto break-all">{{state.browserInfo}} <br> <br> {{state.hmData}}</div>
			<div class="p-4 h-screen overflow-y-auto break-all"><example></example></div>
			<div class="p-4 h-screen overflow-y-auto break-all">{{state.browserInfo}} <br> <br> {{state.hmData}}</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStateStore } from '../stores/state'
	import example from './displayData/example.vue'
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