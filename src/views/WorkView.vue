<template>
	  <main ref="main" id="main" 
	  	class="fixed w-screen h-screen bg-black z-50 top-0 left-0 overflow-y-auto text-white">
		<img aria-hidden="true" v-if="coverImage && !loaded && props.work != 'glimpse'" class="absolute top-0 left-0 w-screen h-screen pointer-events-none object-cover" :src="coverImage">
		<WorkInfo :work="props.work" :show_info_layer="showInfo" />
		<CrossLucid v-if="props.work == 'dwellers-between-the-waters'" :work="props.work" />
		<div v-if="props.work == 'funeral-play' && !state.audioPlaying" class="fixed w-screen h-screen overflow-hidden">
			<iframe class="funeral-iframe w-full h-full overflow-hidden" src='https://funeral.fordatayouareandtodatayoushallreturn.online/funeral/#/'></iframe>
		</div>
		<div v-if="props.work == 'reconnecting'" class="fixed w-screen h-screen overflow-hidden">
			<iframe class="funeral-iframe w-full h-full overflow-hidden" src='https://reconnecting.aliceyuanzhang.com/'></iframe>
		</div>
		<VideoWorkWrapper 
			v-if="props.work == 'symbiotic-ai' || props.work == 'digital-traces' || props.work == 'landscape-enter-life'" :work="props.work" />
		<div v-if="props.work == 'glimpse' " class="h-full grid place-items-center " >
			<span class="p-2 lg:p-4 text-white text-lg xl:text-2xl font-DMregular">{{state.getTrans('please-stop-any-mouse-action-and-wait')}}</span>
		</div>
	  </main>
</template>

<script setup>
	import { ref, onMounted, onUnmounted, computed, provide } from 'vue';
	import { useRoute } from 'vue-router'
	import { useStateStore } from '../stores/state'
	import { fromEvent } from 'rxjs';
	import WorkInfo from '../components/works/WorkInfo.vue'
	import VideoComponent from '../components/works/VideoComponent.vue'
	import CrossLucid from '../components/works/CrossLucid.vue'
	import VideoWorkWrapper from '../components/works/VideoWorkWrapper.vue'
	import { useClStore } from '../stores/CrossLucid'

	const cl_store = useClStore()
	const state = useStateStore()
	const props = defineProps(['langauge', 'work'])
	const route = useRoute()
	const api_base =  import.meta.env.VITE_API_BASE
	const loaded = ref(false)
	const main = ref(null)
	let timeout_id = null
	const showInfo = ref(true)
	const player = ref(null)

	provide('player', player)

	console.log(props)

	// Set language if direct navigation
	if (state.siteLang.value != props.langauge){
		store.$patch({siteLang: props.language})
	}

	const coverImage = computed(() => {
		const filter_work = state.worksInfo.filter((work_obj) => work_obj.slug == props.work)
		if (filter_work.length != 0 && filter_work[0].cover) {
			return `${api_base}assets/${filter_work[0].cover.filename_disk}`
		} else {
			return null
		}
	})

	const set_info_timeout = () => {
		// Don't hide info on iframes!
		if (!['reconnecting','funeral-play'].includes(props.work)){
			showInfo.value = true
			if (timeout_id !== null){
				clearTimeout(timeout_id)
			}
			timeout_id = setTimeout(() => {
				showInfo.value = false
			}, 3000)
		}
	}

	onMounted(() => {
		state.mainTransition = 'zoom-fade'
		state.interfaceVisible = false
		if(props.work == 'funeral-play'){
			loaded.value = true
		}
		cl_store.addWork(props.work)
		if (props.work != 'dwellers-between-the-waters'){
			cl_store.$patch({'lastWork': props.work})
		}
		const move = fromEvent(main.value, 'mousemove')
		set_info_timeout()
		move.subscribe(() => {
			set_info_timeout()

		})
		if (props.work == 'dwellers-between-the-waters' ||
			props.work == 'reconnecting' ||
			props.work == 'funeral-play')
		{
			state.screensaver_disabled = true
		}
	})

	onUnmounted(() => {
		state.screensaver_disabled = false
	})



</script>

<style scoped>

</style>