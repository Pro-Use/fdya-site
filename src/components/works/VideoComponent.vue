<template>

    <video ref="video" class="w-screen h-screen absolute top-0 left-0 object-contain z-40 bg-black" :src="video" autoplay playsinline="true">

    </video>


</template>

<script setup>
	import { defineProps, ref, computed, onMounted, onUnmounted } from 'vue'
	import { useStateStore } from '../../stores/state'

	const state = useStateStore()
	const api_base =  import.meta.env.VITE_API_BASE
	const props = defineProps(['video_file'])
	console.log(props.video_file)
	const video = computed(() => {
		return `${api_base}assets/${props.video_file}`
	})


    onMounted( () => {
    	state.screensaver_disabled = true
    })

    onUnmounted( () => {
    	state.screensaver_disabled = false
    })
	
</script>
<style scoped>
	
</style>