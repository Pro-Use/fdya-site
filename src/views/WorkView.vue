<template>
	  <main ref="main" id="main" 
	  	class="fixed w-screen h-screen bg-black z-50 top-0 left-0 overflow-y-auto text-white">
		<img aria-hidden="true" v-if="coverImage && !loaded" class="absolute top-0 left-0 w-screen h-screen pointer-events-none object-cover" :src="coverImage">
		<WorkInfo :work="props.work" :show_info_layer="showInfo" />
		<CrossLucid v-if="props.work == 'dwellers-between-the-waters'" :work="props.work" />
		<div v-if="props.work == 'funeral-play'" class="fixed w-screen h-screen overflow-hidden">
			<iframe class="funeral-iframe w-full h-full overflow-hidden" src='http://funeral.fordatayouareandtodatayoushallreturn.online/funeral/#/'></iframe>
		</div>
		<VideoWorkWrapper 
			v-if="props.work == 'symbiotic-ai' || props.work == 'digital-traces' || props.work == 'landscape-enter-life'" :work="props.work" />
	  </main>
</template>

<script setup>
	import { ref, defineProps, onMounted, computed } from 'vue';
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
		showInfo.value = true
		if (timeout_id !== null){
			clearTimeout(timeout_id)
		}
		timeout_id = setTimeout(() => {
			showInfo.value = false
		}, 3000)
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
	})



</script>

<style scoped>

</style>