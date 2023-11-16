<template>
	<div class="h-full">
	    <video 
	    	ref="video" class="w-screen h-screen h-fill-available absolute top-0 left-0 object-contain z-40 bg-black" 
	    	:src="video_file" playsinline="true">
	    </video>
	</div>


</template>

<script setup>
	import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
	import { useStateStore } from '../../stores/state'

	const state = useStateStore()
	const api_base =  import.meta.env.VITE_ASSET_BASE
	const props = defineProps(['video_file'])
	const video = ref(null)
	const is_paused = ref(false)
	const can_play = ref(false)
	const player = inject('player')

	const video_file = computed(() => {
		return `${api_base}${props.video_file}`
	})

    onMounted( () => {
    	state.screensaver_disabled = true
    	// video.value.onplaying = () => {
    	// 	is_paused.value = false
    	// }
    	// video.value.onpause = () => {
    	// 	is_paused.value = true
    	// }

    	// video.value.oncanplay = () => {
    	// 	console.log('can_play')
    	// 	video.value.play()
    	// 	can_play.value = true
    	// 	setTimeout(() => {
	    // 		if (video.value.paused){
	    // 			is_paused.value = true
	    // 		}
	    // 	}, 500)

    	// }

    	
    	player.value = video.value
    })

    onUnmounted( () => {
    	state.screensaver_disabled = false
    })
	
</script>
<style scoped>
	
</style>