<template>
	<WorkInfo :work="props.work" />
</template>

<script setup>
	import { ref, defineProps, onMounted } from 'vue';
	import { useRoute } from 'vue-router'
	import { useStateStore } from '../stores/state'
	import WorkInfo from '../components/works/WorkInfo.vue'

	const state = useStateStore()
	const props = defineProps(['langauge', 'work'])
	const route = useRoute()

	console.log(props)

	// Set language if direct navigation
	if (state.siteLang.value != props.langauge){
		store.$patch({siteLang: props.language})
	}




</script>

<style scoped>
	
</style>