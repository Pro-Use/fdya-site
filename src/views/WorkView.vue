<template>
	  <main class="fixed w-screen h-screen bg-black z-50 top-0 left-0 overflow-y-auto text-white">
        <img v-if="coverImage" class="absolute top-0 left-0 w-screen h-screen pointer-events-none object-cover" :src="coverImage">
		<WorkInfo :work="props.work" />
		<CrossLucid v-if="props.work == 'dwellers-between-the-waters'" />
		<VideoComponent v-else :work="props.work"></VideoComponent>
	  </main>
</template>

<script setup>
	import { ref, defineProps, onMounted, computed } from 'vue';
	import { useRoute } from 'vue-router'
	import { useStateStore } from '../stores/state'
	import WorkInfo from '../components/works/WorkInfo.vue'
	import VideoComponent from '../components/works/VideoComponent.vue'
	import CrossLucid from '../components/works/CrossLucid.vue'

	const state = useStateStore()
	const props = defineProps(['langauge', 'work'])
	const route = useRoute()
	const api_base =  import.meta.env.VITE_API_BASE

	console.log(props)

	// Set language if direct navigation
	if (state.siteLang.value != props.langauge){
		store.$patch({siteLang: props.language})
	}

	const coverImage = computed(() => {
		const filter_work = state.worksInfo.filter((work_obj) => work_obj.slug == props.work)
		if (filter_work.length != 0 && filter_work[0].cover) {
			return `${api_base}assets/${filter_work[0].cover}`
		} else {
			return null
		}
	})

	onMounted(() => {
		state.mainTransition = 'zoom-fade'
		state.interfaceVisible = false
	})



</script>

<style scoped>
	
</style>