<template>
	<div class="h-full">
	    <video 
	    	ref="video" class="w-screen h-screen absolute top-0 left-0 object-contain z-40 bg-black" 
	    	:src="video_file" autoplay playsinline="true">
	    </video>
	    <div v-if="is_paused" @click="video.play" class="h-full grid place-items-center cursor-pointer">
			<PlayButton />
		</div>
	</div>


</template>

<script setup>
	import { defineProps, ref, computed, onMounted, onUnmounted } from 'vue'
	import { useStateStore } from '../../stores/state'
	import PlayButton from '../../components/icons/PlayButton.vue'

	const state = useStateStore()
	const api_base =  import.meta.env.VITE_API_BASE
	const props = defineProps(['video_file'])
	const video = ref(null)
	const is_paused = ref(false)

	const video_file = computed(() => {
		return `${api_base}assets/${props.video_file}`
	})

    onMounted( () => {
    	state.screensaver_disabled = true
    	video.value.onplaying = () => {
    		is_paused.value = false
    	}
    	video.value.onpause = () => {
    		is_paused.value = true
    	}

    	setTimeout(() => {
    		if (video.value.paused){
    			is_paused.value = true
    		}
    	}, 200)
    })

    onUnmounted( () => {
    	state.screensaver_disabled = false
    })
	
</script>
<style scoped>
	
</style>