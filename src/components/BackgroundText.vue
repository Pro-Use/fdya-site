<template>
	<div aria-hidden="true" class="bg-text h-screen w-screen">
		<div class="grid grid-cols-3">
			<div class="p-4 h-screen overflow-y-auto break-all">{{state.browserInfo}} {{additionalInfo}}</div>
			<div class="p-4 h-screen overflow-y-auto break-all"><example></example></div>
			<div class="p-4 h-screen overflow-y-auto break-all">{{state.browserInfo}} <br> <br> {{state.hmData}}</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useStateStore } from '../stores/state'
	import example from './displayData/example.vue'
	import axios from 'axios';
	const state = useStateStore()

	const additionalInfo = ref('')

	onMounted( async () => {
		const api_base =  import.meta.env.VITE_API_BASE
		const res = await axios.get(api_base+'items/browser_info?sort=-date_created&limit=20')
		console.log(res.data.data)
		res.data.data.forEach((data) => {
			console.log(data)
			additionalInfo.value += data.info
		})
	})
	
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