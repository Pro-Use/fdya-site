<template>
	<div class="pb-8" aria-hidden="true">
		<button @click="play_toggle()" class="flex hover:text-yellow">
			<span class="w-5 pt-1.5">
				<AudioIconSmall v-if="!is_playing" class="h-full"></AudioIconSmall>
				<StopIconSmall v-else class="h-full"/>
			</span>
			<span class="text-s row-start-1 pl-2 uppercase text-left">
				{{access_work_info.accessible_description}}
			</span>
		</button>
		<div class="text-s row-start-2 pl-2 uppercase h-2">
			<span v-if="is_playing">{{file_position}}/{{file_duration}}</span>
		</div>
		<audio v-if="audio_file != null" ref="player" :src="audio_file" v-show="false" preload='metadata'></audio>
		</div>
	
</template>
<script setup>
	import { ref, computed, onMounted, onUnmounted,  inject } from 'vue'
	import { useStateStore } from '../../stores/state'
	import AudioIconSmall from '../icons/AudioIconSmall.vue';
	import StopIconSmall from '../icons/StopIconSmall.vue'

	const state = useStateStore()
	const props = defineProps(['work'])
	const api_base =  import.meta.env.VITE_API_BASE
	const player = ref(null)
	const file_duration = ref(null)
	const file_position = ref(null)
	const is_playing = ref(false)
	const v_player = inject('player')

	const access_work_info = computed(() => {
		const filter_work = state.accessInfoTranslated.filter((work_obj) => work_obj.slug == props.work)
		console.log(filter_work)
		if (filter_work.length != 0) {
			return filter_work[0]
		} else {
			return null
		}
	})

	const audio_file = computed(() => {
		if (access_work_info.value.audio_file !== null){
			return `${api_base}assets/${access_work_info.value.audio_file.filename_disk}`
		} else {
			return null
		}
	})

	const play_toggle = () => {
		if (!player.value?.paused){
			player.value.pause()
			is_playing.value = false
			state.audioPlaying = false
		} else if (audio_file.value !== null && player.value?.paused){
			player.value.play()
			is_playing.value = true
			state.audioPlaying = true
			if (v_player.value){
				v_player.value.pause()
			}
		}
	}

	const secs_to_timecode = (seconds) => {
         let minutes = ~~(seconds / 60);
         minutes = minutes.toString().padStart(2, '0')
         let extraSeconds = seconds % 60;
         extraSeconds = extraSeconds.toString().padStart(2, '0')
         return `${minutes}:${extraSeconds}`
      }

	onMounted(() => {
		if(player.value){
			player.value.onloadedmetadata = () => {
				file_duration.value = secs_to_timecode(player.value.duration.toFixed(0))
			}
			player.value.ontimeupdate = () => {
				file_position.value = secs_to_timecode(player.value.currentTime.toFixed(0))
			}
		}
	})
	onUnmounted(() => {
		state.audioPlaying = false
	})
	
</script>
<style scoped>
	
</style>