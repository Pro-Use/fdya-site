<template>
	<Transition name="fade">
		<div v-show="showInfoLayer">
			<h1 class="fixed z-50 bottom-0 left-0 invisible sm:visible p-2 lg:p-4 text-white text-lg xl:text-2xl font-DMregular">
				<i>{{ work_info.title_en }}</i>
				<br>{{ work_info.artist_en }}
			</h1>
			
			<button @click="toggleInfo" 
				class="fixed bottom-0 right-0 p-2 lg:p-4 text-white text-lg xl:text-2xl font-DMregular z-50">
				<span class="sr-only">About this artwork</span>
				<span aria-hidden="true">INFO</span>
			</button>

			<router-link to="/" class="fixed z-50 top-0 right-0 p-2 lg:p-4 text-white text-lg xl:text-2xl font-DMregular">
				<span class="sr-only">Back to index page</span>
				<span aria-hidden="true">CLOSE</span>
			</router-link>
		</div>
	</Transition>
	<Transition name="zoom-fade">
		<div v-show="showInfo" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-lg font-DMregular leading-tighter "> 
			<div class="grid-cols-modal lg:grid-cols-modal-xl grid gap-1">
            <div class="modal-body grid grid-cols-2 gap-16 p-2 lg:p-4  max-w-[1200px]">
                <div class="col-span-2">
					<h2 class="pb-8 text-lg xl:text-2xl uppercase"><i>{{ work_info.title_en }}</i><br>{{ work_info.artist_en }}</h2>
					<div class="text-base xl:text-lg" v-html="work_info.description_en"></div>
                </div>   
            </div>
            <div class="close-button">
				<button ref="closeInfo" @click="toggleInfo" class="sticky p-2 lg:p-4 top-0 text-lg xl:text-2xl text-white text-right block w-full">CLOSE</button>
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