<template>
	<div class="pb-8" aria-hidden="true">
		<button @click="play_toggle()" class="flex">
			<span v-if="!is_playing">
				<AudioIconSmall></AudioIconSmall>
			</span>
			<span v-else>
				<StopIconSmall />
			</span>
			<span class="text-xs row-start-1 pl-2 uppercase">{{access_work_info.accessible_description}}</span>
			<audio ref="player" v-show="false"></audio>
		</button>
	</div>
	
</template>
<script setup>
	import { ref, computed, onMounted, inject } from 'vue'
	import { useStateStore } from '../../stores/state'
	import AudioIconSmall from '../icons/AudioIconSmall.vue';
	import StopIconSmall from '../icons/StopIconSmall.vue'

	const state = useStateStore()
	const props = defineProps(['work'])
	const api_base =  import.meta.env.VITE_API_BASE
	const player = ref(null)
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
		console.log(player.value)
		if (!player.value?.paused){
			player.value.pause()
			is_playing.value = false
		} else if (audio_file.value !== null && player.value?.paused){
			player.value.src = audio_file.value
			player.value.play()
			is_playing.value = true
			if (v_player.value){
				v_player.value.pause()
			}
		}
	}

	onMounted(() => {
	})
	
</script>
<style scoped>
	
</style>