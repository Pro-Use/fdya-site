<template>
	<main id="main" 
	  	class="fixed w-screen h-screen bg-black z-50 top-0 left-0 overflow-y-auto text-white">
		<div v-if="access_work_info.work">
			<h1 class="">
				<i>{{ work_info.title }}</i>
				<br>{{ work_info.artist }}
			</h1>
		</div>
		<div v-else>{{access_work_info.title}}</div>
		<div v-if="work_info" class="grid grid-cols-2 gap-16 p-2 lg:p-4  max-w-[1200px]">
	        <div class="col-span-2">
				<h2 class="pb-8 text-lg xl:text-2xl uppercase">
					<div v-html="work_info.listing"></div>
				</h2>
				<div class="text-base xl:text-lg rte" v-html="work_info.description"></div>
	        </div>   
	    </div>
	    <figure v-if="audio_file">
	        <figcaption class="sr-only">{{access_work_info.accessible_description}}:</figcaption>
	        <audio controls autoplay :src="audio_file">
	        </audio>
	    </figure>
	</main>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { useStateStore } from '../stores/state'

	const state = useStateStore()
	const props = defineProps(['page', 'language'])
	const api_base =  import.meta.env.VITE_API_BASE

	const access_work_info = computed(() => {
		const filter_work = state.accessInfoTranslated.filter((work_obj) => work_obj.slug == props.page)
		console.log(filter_work)
		if (filter_work.length != 0) {
			return filter_work[0]
		} else {
			return null
		}
	})

	const work_info = computed(() => {
		if (access_work_info.value.work !== null){
			let index = access_work_info.value.work.sort - 1
			return state.worksInfoTranslated[index]
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

</script>

<style scoped>
</style>