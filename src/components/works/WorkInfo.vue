<template>
	<Transition name="fade">
		<div v-show="showInfoLayer">
			<h1 class="fixed z-50 bottom-4 left-4 p-4 text-white text-3xl font-DMregular">
				<i>{{ work_info.title_en }}</i>
				<br>{{ work_info.artist_en }}
			</h1>
			
			<button @click="toggleInfo" 
				class="fixed bottom-4 right-4 p-4 text-white text-3xl font-DMregular z-50">
				<span class="sr-only">About this artwork</span>
				<span aria-hidden="true">INFO</span>
			</button>

			<router-link to="/" class="fixed z-50 top-4 right-4 p-4 text-white text-3xl font-DMregular">
				<span class="sr-only">Back to index page</span>
				<span aria-hidden="true">CLOSE</span>
			</router-link>
		</div>
	</Transition>
	<Transition name="zoom-fade">
		<div v-show="showInfo" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tight ">
			<button ref="closeInfo" @click="toggleInfo" class="absolute top-4 right-4 p-4 text-white text-3xl font-DMregular focus:text-yellow">CLOSE</button>
			<div class="p-4 grid grid-cols-3 gap-8">
				<div class="col-span-2">
					<h2 class="pb-8 uppercase"><i>{{ work_info.title_en }}</i>
					<br>{{ work_info.artist_en }}</h2>
					<div v-html="work_info.description_en"></div>
				</div>
			</div> 
		</div>
	</Transition>
</template>
<script setup>
	import { defineProps, ref, computed } from 'vue'
	import { useStateStore } from '../../stores/state'

	const state = useStateStore()
	const props = defineProps(['work'])
	console.log(props.work)
	const showInfoLayer = ref(true)
	const showInfo = ref(false)
	const closeInfo = ref()

	const work_info = computed(() => {
		const filter_work = state.worksInfo.filter((work_obj) => work_obj.slug == props.work)
		console.log(filter_work)
		if (filter_work.length != 0) {
			return filter_work[0]
		} else {
			return null
		}
	})

	let timer;

	document.addEventListener('mousemove', () => {
		showInfoLayer.value = true
		clearTimeout(timer);
		timer = setTimeout(hideInfoLayer, 5000);
	});

	function hideInfoLayer(){
		showInfoLayer.value = false
	}

	function toggleInfo(){
		showInfo.value = !showInfo.value
		console.log(showInfo.value)
		closeInfo.value.focus()
	}
	
</script>
<style scoped>
	
</style>