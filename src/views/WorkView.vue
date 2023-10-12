<template>
	  <main class="fixed w-screen h-screen bg-black z-50 top-0 left-0 overflow-y-auto text-white">
        <img class="absolute top-0 left-0 w-screen h-screen pointer-events-none object-cover" src="../assets/poster-1.jpg">
		<WorkInfo :work="props.work" />
		<VideoComponent :work="props.work"></VideoComponent>
	  </main>
</template>

<script setup>
	import { ref, defineProps, onMounted } from 'vue';
	import { useRoute } from 'vue-router'
	import { useStateStore } from '../stores/state'
	import WorkInfo from '../components/works/WorkInfo.vue'
	import VideoComponent from '../components/works/VideoComponent.vue'

	const state = useStateStore()
	const props = defineProps(['langauge', 'work'])
	const route = useRoute()

	console.log(props)

	// Set language if direct navigation
	if (state.siteLang.value != props.langauge){
		store.$patch({siteLang: props.language})
	}

	onMounted(() => {
		state.mainTransition = 'zoom-fade'
		state.interfaceVisible = false
	})



</script>

<style scoped>
	
</style>