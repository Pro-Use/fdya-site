<template>

    <video ref="video" class="w-screen h-screen absolute top-0 left-0 object-cover z-40" :src="video" autoplay playsinline="true">

    </video>


</template>

<script setup>
	import { defineProps, ref, computed } from 'vue'
	import { useStateStore } from '../../stores/state'

	const api_base =  import.meta.env.VITE_API_BASE
	const props = defineProps(['video_file'])
	console.log(props.video_file)
	const video = computed(() => {
		return `${api_base}assets/${props.video_file}`
	})
	
</script>
<style scoped>
	
</style>