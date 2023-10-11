<template>
	<Transition name="fade" appear>
		<div>
			<router-link to="/" class="absolute top-4 right-4 p-4 text-white text-3xl font-DMregular">CLOSE</router-link>
			
			<h1 class="absolute bottom-4 left-4 p-4 text-white text-3xl font-DMregular">
				<i>{{ work_info.title_en }}</i>
				<br>{{ work_info.artist_en }}
			</h1>
			
			<button @click="toggleInfo" class="absolute bottom-4 right-4 p-4 text-white text-3xl font-DMregular">INFO</button>
			
			<Transition name="zoom-fade">
				<div v-if="showInfo" class="fixed w-screen h-screen top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 text-3xl p-5 font-DMregular leading-tight uppercase">
					<button @click="toggleInfo" class="absolute top-4 right-4 p-4 text-white text-3xl font-DMregular">CLOSE</button>
					{{ work_info.description_en }}
				</div>
			</Transition>
		</div>
	</Transition>
</template>
<script setup>
	import { defineProps, ref, computed } from 'vue'
	import { useStateStore } from '../../stores/state'

	const state = useStateStore()
	const props = defineProps(['work'])
	console.log(props.work)
	const showInfo = ref(false)

	const work_info = computed(() => {
		const filter_work = state.worksInfo.filter((work_obj) => work_obj.slug == props.work)
		console.log(filter_work)
		if (filter_work.length != 0) {
			return filter_work[0]
		} else {
			return null
		}
	})

	function toggleInfo(){
		showInfo.value = !showInfo.value
		console.log(showInfo.value)
	}
	
</script>
<style scoped>
	
</style>