<template>
	<div>eer</div>
</template>
<script setup>
	import { defineProps, ref, computed } from 'vue'
	import { useStateStore } from '../../stores/state'

	const state = useStateStore()
	const props = defineProps(['work'])
	console.log(props.work)

	const work_info = computed(() => {
		const filter_work = state.worksInfo.filter((work_obj) => work_obj.slug == props.work)
		console.log(filter_work)
		if (filter_work.length != 0) {
			return filter_work[0]
		} else {
			return null
		}
	})
	
</script>
<style scoped>
	
</style>