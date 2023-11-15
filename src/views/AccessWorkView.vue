<template>
    <main id="main" 
		class="fixed w-screen h-screen h-fill-available top-0 left-0 overflow-y-auto bg-black-40 backdrop-blur-3xl text-white z-50 font-DMregular leading-tighterer">
        <div v-if="access_work_info" class="grid-cols-modal lg:grid-cols-modal-xl grid gap-1">
            <div class="modal-body grid grid-cols-2 gap-16  p-2 lg:p-4 max-w-[1200px]">
                <div class="col-span-2">
					<div v-if="access_work_info.work">
						<h1 class="text-lg xl:text-2xl uppercase">
							<div v-html="work_info.listing"></div>
						</h1>
					</div>
					<h1 class="text-lg xl:text-2xl uppercase" v-else>{{access_work_info.title}}</h1>
				</div>
				<div>
					<figure v-if="audio_file" class="col-span-2">
						<figcaption class="sr-only">{{access_work_info.accessible_description}}:</figcaption>
						<audio controls :src="audio_file"></audio>
					</figure>
				</div>
				<div v-if="work_info" class="col-span-2">
					<div class="text-base xl:text-lg rte" v-html="work_info.description"></div>
				</div>   
			</div>
			<div class="close-button">
                <router-link class="sticky p-2 lg:p-4 top-0 text-lg xl:text-2xl text-white text-right block w-full hover:text-yellow" to="/">
                    <span class="sr-only">{{state.getTrans('back-to-home-page')}}</span>
                    <span aria-hidden="true">{{state.getTrans('close').toUpperCase()}}</span>
                </router-link>
            </div>
		</div>
	</main>





</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
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


	onMounted(() => {
		state.mainTransition = 'zoom-fade'
		state.interfaceVisible = false
	})

</script>

<style scoped>
</style>